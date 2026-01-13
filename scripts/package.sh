#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$REPO_ROOT/dist"
ZIP="$DIST/manifest.zip"

if [ ! -d "$DIST" ]; then
  echo "dist folder not found. Run npm run build first."
  exit 1
fi

if [ -f "$ZIP" ]; then
  rm -f "$ZIP"
fi

cd "$DIST"
zip -r manifest.zip ./*
echo "Package created: $ZIP"
