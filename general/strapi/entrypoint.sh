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
 rsync -av --no-owner --no-group build/ "${BUILD_DIR}"
fi

if [ -s "/strapi/${ONTPUB_FAMILY:-dev}.db" ] ; then
 # use custom db in "/strapi/" directory
 echo "[INFO] Use database: \"/strapi/${ONTPUB_FAMILY:-dev}.db\""
 rm -rf .tmp/data.db
 ln -s /strapi/${ONTPUB_FAMILY:-dev}.db .tmp/data.db
elif [ -s "/strapi/${ONTPUB_FAMILY:-dev}.db.template" ] ; then
 echo "[WARN] New database: \"/strapi/${ONTPUB_FAMILY:-dev}.db.template\" -> \"/strapi/${ONTPUB_FAMILY:-dev}.db\""
 cp -av "/strapi/${ONTPUB_FAMILY:-dev}.db.template" "/strapi/${ONTPUB_FAMILY:-dev}.db"
 rm -rf .tmp/data.db
 ln -s /strapi/${ONTPUB_FAMILY:-dev}.db .tmp/data.db
else
 echo "[INFO] Use default database from image: \"${STRAPI_DIR}/.tmp/data.db\""
fi

test -d "/strapi/${ONTPUB_FAMILY:-dev}.uploads" && rm -rf public/uploads && ln -s "/strapi/${ONTPUB_FAMILY:-dev}.uploads" public/uploads

echo "[INFO] Starting strapi."
exec node_modules/.bin/strapi develop
