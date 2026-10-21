#!/bin/bash
set -e

# Load NVM and Node into PATH for non-interactive scripts
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Dynamically resolve script's directory so $PROJECT_DIR is always valid
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

export IMAGE_TAG="ghcr.io/ralder123/gmx-payload/payload3:latest"

echo "=============================================="
echo "==> [Build] Building Docker image locally (linux/amd64)..."
echo "=============================================="
cd "$PROJECT_DIR"

docker build \
  --build-arg PAYLOAD_PUBLIC_SERVER_URL=http://2.24.222.86.nip.io:3000 \
  --build-arg NEXT_PUBLIC_SERVER_URL=http://2.24.222.86.nip.io:3000 \
  --platform linux/amd64 \
  -t "$IMAGE_TAG" \
  ./payload3

echo "=============================================="
echo "==> [Build] Docker image built successfully!"
echo "=============================================="