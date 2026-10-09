# syntax=docker/dockerfile:1

# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --dangerously-allow-all-builds

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY scripts ./scripts
RUN mkdir -p /app/public
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_DB_DURING_BUILD=true
RUN PAYLOAD_SECRET=dummy_secret_for_build \
    DATABASE_URI=postgres://dummy:dummy@localhost:5432/dummy \
    pnpm run build

# Stage 3: Production runner container
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Register tsx loader so Node.js can execute .ts migration files at runtime
ENV NODE_OPTIONS="--import=tsx/esm"

# Create a non-root system user and group for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir -p /app/public \
    && chown -R nextjs:nodejs /app

# Copy built assets, runtime node_modules, and migration scripts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/migrations ./migrations
COPY --from=builder --chown=nextjs:nodejs /app/src ./src

# Switch to the non-root user
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]