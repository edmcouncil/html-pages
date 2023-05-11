#!/bin/bash
echo "[INFO] Starting init strapi"

echo "[INFO] Install strapi without run."
npx create-strapi-app@latest strapi-dashboard --quickstart --no-run

echo "[INFO] Copy database."
mkdir ./strapi-dashboard/.tmp
cp /opt/.tmp/fibo.db ./strapi-dashboard/.tmp/data.db

echo "[INFO] Copy structures."
cp -R /opt/src/ ./strapi-dashboard

echo "[INFO] Run Strapi."
cd /opt/strapi-dashboard
npm run develop
