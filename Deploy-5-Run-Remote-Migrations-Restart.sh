#!/bin/bash
set -e

# Dynamically resolve script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

echo "=============================================="
echo "==> [Migrate] Executing remote Payload migrations & restarting..."
echo "=============================================="

ssh devuser1@2.24.222.86 "cd /opt/gmx-payload && \
  docker compose exec -T payload ./node_modules/.bin/payload migrate && \
  docker compose exec -T payload ./node_modules/.bin/payload generate:importmap && \
  docker compose restart payload"

echo "=============================================="
echo "==> [Migrate] Deployment and migration complete successfully!"
echo "=============================================="