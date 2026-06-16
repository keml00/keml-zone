#!/bin/bash
set -e

echo "=== Deploying keml-zone ==="
cd /var/www/keml-zone

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci --only=production

echo "Building..."
npm run build

echo "Copying standalone to running directory..."
rsync -avz --delete .next/standalone/ /var/www/keml-zone-standalone/ \
  --include=.next/static/ \
  --include=public/ \
  --include=data/ \
  --include=package.json \
  --include=server.js \
  --exclude=*

echo "Ensuring .env.local..."
cp -n .env.local /var/www/keml-zone-standalone/.env.local 2>/dev/null || true

echo "Restarting PM2..."
pm2 restart keml-studio --update-env
pm2 save

echo "=== Deploy complete ==="
