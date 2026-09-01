#!/usr/bin/env bash
# Assemble the deployable site into dist/.
# The repo root stays as-is so GitHub Pages keeps working; Cloudflare
# deploys from dist/, which contains only the files the site actually needs.
set -euo pipefail

cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist

cp ./*.html dist/
cp style.css script.js dist/
cp -R images dist/

# Strip macOS metadata that can sneak into the image folder.
find dist -name '.DS_Store' -delete

echo "Built dist/ with $(find dist -type f | wc -l | tr -d ' ') files ($(du -sh dist | cut -f1))"
