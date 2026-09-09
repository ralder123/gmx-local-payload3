#!/usr/bin/env bash

# ==============================================================================
# Script Name: fix-docker-build.sh
# Description: Resets src/payload.config.ts via git, cleans db configurations, 
#              injects a clean single-line SQLite build fallback, forces dynamic 
#              routes, and generates a robust Dockerfile with safe public dir handling.
# ==============================================================================

set -euo pipefail

PROJECT_DIR="${1:-./payload3}"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "ERROR: Target directory not found: $PROJECT_DIR" >&2
  exit 1
fi

PROJECT_DIR="$(cd "$PROJECT_DIR" && pwd)"

fail() {
  echo "ERROR: $1" >&2
  exit 1
}

# **Section 1: Pre-flight Checks & Cleanup**
echo "==> [1/5] Running pre-flight checks and cleaning conflicting lockfiles..."

[ -f "$PROJECT_DIR/package.json" ] || fail "package.json is missing."
[ -f "$PROJECT_DIR/pnpm-lock.yaml" ] || fail "pnpm-lock.yaml is missing."
[ -f "$PROJECT_DIR/next.config.ts" ] || fail "next.config.ts is missing."

rm -f "$PROJECT_DIR/package-lock.json" "$PROJECT_DIR/yarn.lock"

# Reset config to pristine git state if git is available
if [ -d "$PROJECT_DIR/.git" ] || [ -d "$(dirname "$PROJECT_DIR")/.git" ]; then
  echo "==> Resetting src/payload.config.ts to clean git state..."
  git -C "$PROJECT_DIR" checkout HEAD -- src/payload.config.ts 2>/dev/null || true
fi

# **Section 2: Next.js Standalone Output Configuration**
echo "==> [2/5] Configuring next.config.ts for standalone deployment..."

python3 - "$PROJECT_DIR/next.config.ts" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()

lines = [line for line in text.splitlines() if line.strip() != "export default nextConfig"]
text = "\n".join(lines).rstrip() + "\n"

if "output: 'standalone'" not in text and 'output: "standalone"' not in text:
    marker = "const nextConfig: NextConfig = {\n"
    if marker in text:
        text = text.replace(marker, marker + "  output: 'standalone',\n", 1)

payload_export = "export default withPayload(nextConfig)"
if payload_export not in text:
    text = text.rstrip() + "\n\n" + payload_export + "\n"

path.write_text(text)
PY

# **Section 3: Payload Database Configuration Fallback Patch**
echo "==> [3/5] Patching src/payload.config.ts with clean SQLite build fallback..."

python3 - "$PROJECT_DIR" <<'PY'
from pathlib import Path
import sys
import subprocess

project_dir = Path(sys.argv[1])
config_path = project_dir / "src" / "payload.config.ts"

if config_path.exists():
    lines = config_path.read_text().splitlines()
    
    new_lines = []
    in_db_block = False
    brace_depth = 0
    
    for line in lines:
        stripped = line.strip()
        if not in_db_block and (stripped.startswith("db:") or stripped.startswith("db :")):
            in_db_block = True
            brace_depth += line.count('{') - line.count('}')
            if brace_depth <= 0 and not line.endswith('(') and not line.endswith('{'):
                in_db_block = False
            continue
            
        if in_db_block:
            brace_depth += line.count('{') - line.count('}')
            if brace_depth <= 0 and (')' in line or '}' in line):
                in_db_block = False
            continue
            
        new_lines.append(line)
        
    text = "\n".join(new_lines)
    
    if "sqliteAdapter" not in text:
        text = "import { sqliteAdapter } from '@payloadcms/db-sqlite'\n" + text
        
    new_db_line = "  db: process.env.SKIP_DB_DURING_BUILD === 'true' ? sqliteAdapter({ client: { url: ':memory:' } }) : postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || '' } }),"
      
    if "collections:" in text:
        text = text.replace("collections:", new_db_line + "\n  collections:")
    elif "export default buildConfig({" in text:
        text = text.replace("export default buildConfig({", "export default buildConfig({\n" + new_db_line)
        
    config_path.write_text(text + "\n")

subprocess.run(["pnpm", "--dir", str(project_dir), "add", "@payloadcms/db-sqlite"], check=True)
PY

# **Section 4: Universal Dynamic Route Forcing**
echo "==> [4/5] Forcing dynamic rendering across all page components..."

python3 - "$PROJECT_DIR/src" <<'PY'
from pathlib import Path
import sys

search_dir = Path(sys.argv[1])
if search_dir.exists():
    for path in search_dir.rglob("page.tsx"):
        if "node_modules" in path.parts or ".next" in path.parts:
            continue
        text = path.read_text()
        if "dynamic = 'force-dynamic'" not in text and 'dynamic = "force-dynamic"' not in text:
            text = "export const dynamic = 'force-dynamic';\n\n" + text
            path.write_text(text)
PY

# **Section 5: Dockerfile & .dockerignore Generation**
echo "==> [5/5] Generating Dockerfile and .dockerignore..."

cat > "$PROJECT_DIR/Dockerfile" <<'EOF'
# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --dangerously-allow-all-builds

FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure public directory exists to satisfy Docker copy commands even if empty
RUN mkdir -p /app/public
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_DB_DURING_BUILD=true
RUN PAYLOAD_SECRET=dummy_secret_for_build \
    DATABASE_URI=postgres://dummy:dummy@localhost:5432/dummy \
    pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir -p /app/public \
    && chown -R nextjs:nodejs /app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
EOF

cat > "$PROJECT_DIR/.dockerignore" <<'EOF'
node_modules
.next
.git
.gitignore
.env
.env.*
!.env.example
Dockerfile
docker-compose*.yml
docker-compose*.yaml
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
EOF

echo
echo "==> Setup completed successfully!"
echo "==> Run your fix and build with:"
echo "    ./fix-docker-build.sh && docker build --no-cache -t payload3 ./payload3"
