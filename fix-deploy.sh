#!/bin/bash
set -e

# Export your GitHub credentials for GHCR authentication
export GHCR_USERNAME="ralder123"
export GHCR_TOKEN="ghp_YourActualGitHubPersonalAccessTokenHere"

# Navigate into the infrastructure directory and execute Ansible
echo "Starting deployment to VPS..."
cd payload3-infra-minio-postgres
ansible-playbook -i inventory.ini deploy.yml

echo "Deployment complete!"
echo "To return to the root directory, run: cd /Users/Open/projects/prj-gmx-payload"
