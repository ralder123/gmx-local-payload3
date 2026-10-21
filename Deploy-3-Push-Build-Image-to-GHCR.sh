#!/bin/bash
set -e

# Dynamically resolve script's directory so $PROJECT_DIR is always valid
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

export GHCR_USERNAME="ralder123"
export IMAGE_TAG="ghcr.io/ralder123/gmx-payload/payload3:latest"

# Prompt for GHCR token if missing
if [ -z "$GHCR_TOKEN" ]; then
  echo "GHCR_TOKEN is not set in your environment."
  read -sp "Enter your GitHub Personal Access Token: " GHCR_TOKEN
  echo
fi
export GHCR_TOKEN

echo "=============================================="
echo "==> [GHCR] Authenticating and pushing Docker image..."
echo "=============================================="
cd "$PROJECT_DIR"

echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
docker push "$IMAGE_TAG"

echo "=============================================="
echo "==> [GHCR] Docker image pushed successfully!"
echo "=============================================="