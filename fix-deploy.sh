#!/bin/bash
set -e

# Export your GitHub credentials for GHCR authentication
export GHCR_USERNAME="ralder123"
# PAT Personal Authication Token
# Check if GHCR_TOKEN is set; if not, prompt securely
if [ -z "$GHCR_TOKEN" ]; then
  echo "GHCR_TOKEN is not set in your environment."
  read -sp "Enter your GitHub Personal Access Token: " GHCR_TOKEN
  echo
fi
export GHCR_TOKEN

# Navigate into the infrastructure directory and execute Ansible
echo "Starting deployment to VPS..."
cd payload3-infra-minio-postgres
ansible-playbook -i inventory.ini deploy.yml --ask-become-pass

echo "Deployment complete!"
echo "To return to the root directory, run: cd /Users/Open/projects/prj-gmx-payload"
