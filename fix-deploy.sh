#!/bin/bash
set -e
# Load NVM and Node into PATH for non-interactive scripts
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Target local project directory
PROJECT_DIR="/Users/Open/projects/prj-gmx-payload"
cd "$PROJECT_DIR"

# Export your GitHub credentials for GHCR authentication
export GHCR_USERNAME="ralder123"
if [ -z "$GHCR_TOKEN" ]; then
  echo "GHCR_TOKEN is not set in your environment."
  read -sp "Enter your GitHub Personal Access Token: " GHCR_TOKEN
  echo
fi
export GHCR_TOKEN

IMAGE_TAG="ghcr.io/ralder123/gmx-payload/payload3:latest"

echo "=============================================="
echo "==> [0/4] Generating local Payload TypeScript types..."
echo "=============================================="
cd payload3
pnpm payload generate:types
cd "$PROJECT_DIR"

echo "=============================================="
echo "==> [1/4] Building Docker image locally..."
echo "=============================================="
docker build -t $IMAGE_TAG ./payload3

echo "=============================================="
echo "==> [2/4] Authenticating and pushing to GHCR..."
echo "=============================================="
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
docker push $IMAGE_TAG

echo "=============================================="
echo "==> [3/4] Running Ansible deployment to VPS..."
echo "=============================================="
cd payload3-infra-minio-postgres
ansible-playbook -i inventory.ini deploy.yml --ask-become-pass
cd "$PROJECT_DIR"

echo "=============================================="
echo "==> [4/4] Executing remote Payload migrations & restarting..."
echo "=============================================="
# SSH into VPS to run the container commands inside /opt/gmx-payload using pnpm
ssh devuser1@2.24.222.86 "cd /opt/gmx-payload && \
  docker compose exec payload pnpm payload migrate && \
  docker compose exec payload pnpm payload generate:importmap && \
  docker compose exec payload pnpm payload migrate && \
  docker compose exec payload pnpm payload migrate:create && \
  docker compose exec payload pnpm payload migrate && \
  docker compose restart payload"

echo "==> Deployment and migration complete successfully!"