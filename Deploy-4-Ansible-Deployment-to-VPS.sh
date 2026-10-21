#!/bin/bash
set -e

# Load NVM and Node into PATH for non-interactive scripts
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Target local project directory
export PROJECT_DIR="/Users/Open/projects/prj-gmx-payload"
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
echo "==> [3/4] Running Ansible deployment to VPS..."
echo "=============================================="
cd "$PROJECT_DIR/payload3-infra-minio-postgres"
ansible-playbook -i inventory.ini deploy.yml --ask-become-pass
