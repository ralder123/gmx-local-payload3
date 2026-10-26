#!/bin/bash
set -e

# Add both Apple Silicon and Intel Homebrew paths + standard node locations
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# If you use NVM, ensure it's loaded:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Prompt for GHCR token if missing
if [ -z "$GHCR_TOKEN" ]; then
  echo "GHCR_TOKEN is not set in your environment."
  read -sp "Enter your GitHub Personal Access Token: " GHCR_TOKEN
  echo
fi
export GHCR_TOKEN

# Dynamically resolve script's directory so $PROJECT_DIR is always valid
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

echo "=============================================="
echo "==> [0/4] Generating local Payload Import Map, Migration, & TypeScript types..."
echo "=============================================="
cd "$PROJECT_DIR/payload3"

# Load .env file automatically if it exists so Payload commands have access to DATABASE_URI
if [ -f .env ]; then
  echo "==> Loading environment variables from .env..."
  set -a
  source .env
  set +a
elif [ -f ../.env ]; then
  echo "==> Loading environment variables from parent .env..."
  set -a
  source ../.env
  set +a
fi

# Verify node and pnpm are visible
node -v
pnpm -v

# Clear Local Build Artifacts
rm -rf .next dist .turbo

# Generate import map, create migration, and generate types
pnpm payload generate:importmap
pnpm payload migrate:create --skip-empty
pnpm payload generate:types