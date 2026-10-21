#!/bin/bash
set -e

# Dynamically resolve script's directory so $PROJECT_DIR is always valid
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

echo "=============================================="
echo "==> [Git] Staging, Committing, and Pushing Changes..."
echo "=============================================="
cd "$PROJECT_DIR"

# Stage all changes
git add .

# Check if there are actual changes to commit
if git diff-index --quiet HEAD --; then
  echo "==> Working tree is clean. No changes to commit. Continuing pipeline..."
  exit 0
fi

# Prompt the user for a commit message if there are changes
read -p "Enter your git commit message (e.g., feat: add announcement-banner migration): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
  echo "Error: Commit message cannot be empty. Aborting."
  exit 1
fi

# Generate current date and timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
FULL_COMMIT_MSG="$COMMIT_MSG - $TIMESTAMP"

# Commit and push
git commit -m "$FULL_COMMIT_MSG"
git push -u origin main

echo "==> Git commit and push completed successfully!"