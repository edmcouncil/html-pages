#!/bin/bash

cd "$(dirname "$(realpath "${0}")")"
if [ -f .env ]; then
 set -o allexport; source .env; set +o allexport
fi

STRAPI_DIR="$(dirname "$(realpath "${0}")")/db/${ONTPUB_FAMILY:-dev}strapi"
test -d "${STRAPI_DIR}" || { echo "WARN: setup strapi" ; bash setup.sh ; }
cd "${STRAPI_DIR}" || { echo "ERR: missing STRAPI_DIR=\"${STRAPI_DIR}\"" ; exit 1 ; }

BUILD_DIR="/opt/html-pages/${ONTPUB_FAMILY:-dev}/strapi/admin"
if [ -n "${BUILD_DIR}" ] ; then
 echo "[INFO] Install strapi admin."
 install -d -v "$(dirname "${BUILD_DIR}")"
 rm -rf "${BUILD_DIR}"
 rsync -a --no-owner --no-group build/ "${BUILD_DIR}"
fi

if [ -s "/strapi/export.tar.gz" ] ; then
 echo "[INFO] npm run strapi import -- -f /strapi/export.tar.gz --force"
 npm run strapi import -- -f /strapi/export.tar.gz --force
else
 echo "[INFO] Use default data from image"
fi

echo "[INFO] Starting strapi."
exec node_modules/.bin/strapi develop
