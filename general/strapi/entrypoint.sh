#!/bin/bash

STRAPI_DIR="$(realpath "$(dirname "${0}")")/db/${ONTPUB_FAMILY:-dev}strapi"

cd "${STRAPI_DIR}" || { echo "ERR: missing STRAPI_DIR=\"${STRAPI_DIR}\"" ; exit 1 ; }

if [ -d "/strapi/db" ] ; then
 # executed in docker env
 DATABASE_FILENAME="/strapi/db/${ONTPUB_FAMILY:-dev}.db"
 BUILD_DIR="/opt/html-pages/${ONTPUB_FAMILY:-dev}/strapi/admin"
else
 # executed in local env
 DATABASE_FILENAME="$(dirname "${STRAPI_DIR}")/${ONTPUB_FAMILY:-dev}.db"
fi

if [ ! -e "${DATABASE_FILENAME}" ] ; then
 if [ -e "${DATABASE_FILENAME}.template" ] ; then
  echo "[WARN] New database: \"${DATABASE_FILENAME}.template\" -> \"${DATABASE_FILENAME}\""
  cp -av "${DATABASE_FILENAME}.template" "${DATABASE_FILENAME}"
 else
  echo "[ERROR] Missing database \"${DATABASE_FILENAME}\" and database template \"${DATABASE_FILENAME}.template\""
  sleep 10
  exit 1
 fi
fi

echo "[INFO] Setup strapi database."
install -dv .tmp
rm -rf .tmp/data.db
ln -s "$(realpath "${DATABASE_FILENAME}")" .tmp/data.db

if [ -d "/strapi/src" ] ; then
 echo "[INFO] Syncing structures."
 rsync -av --no-owner --no-group /strapi/src/ src
fi

if [ -n "${BUILD_DIR}" ] ; then
 echo "[INFO] Install strapi admin."
 install -d -v "$(dirname "${BUILD_DIR}")"
 rm -rf "${BUILD_DIR}"
 rsync -av --no-owner --no-group build/ "${BUILD_DIR}"
fi

test -d "/strapi/db/${ONTPUB_FAMILY:-dev}.uploads" && rm -rf public/uploads && ln -s "/strapi/db/${ONTPUB_FAMILY:-dev}.uploads" public/uploads

echo "[INFO] Starting strapi."
exec node_modules/.bin/strapi develop
