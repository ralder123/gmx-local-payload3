#!/bin/bash
set -e

# Dynamically resolve script's directory so $PROJECT_DIR is always valid
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

echo "=============================================="
echo "==> [Git] Staging, Committing, and Pushing Changes..."
echo "=============================================="
cd "$PROJECT_DIR"

# Prompt the user for a commit message before moving forward
read -p "Enter your git commit message (e.g., feat: add announcement-banner migration): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
  echo "Error: Commit message cannot be empty. Aborting."
  exit 1
fi

# Generate current date and timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
FULL_COMMIT_MSG="$COMMIT_MSG - $TIMESTAMP"

# Stage all changes recursively from the project root
git add .

# Commit with the user's message plus timestamp
git commit -m "$FULL_COMMIT_MSG"

# Push to origin main
git push -u origin main

echo "==> Git commit and push completed successfully!"