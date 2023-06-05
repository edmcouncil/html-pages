#!/bin/bash

cd "$(dirname "$(realpath "${0}")")"
if [ -f .env ]; then
 set -o allexport; source .env; set +o allexport
fi

STRAPI_DIR="$(dirname "$(realpath "${0}")")/db/${ONTPUB_FAMILY:-dev}strapi"

install -dv "$(dirname "${STRAPI_DIR}")"
if [ ! -e "${STRAPI_DIR}" ] ; then
 echo "[INFO] Install strapi in \"${STRAPI_DIR}\" without run."
 npx create-strapi-app@latest "${STRAPI_DIR}" --quickstart --no-run
 sed -i "s|\(port:.*\)$|\1 url: '/${ONTPUB_FAMILY:-dev}/strapi',|g" "${STRAPI_DIR}/config/server.js"
 echo "[INFO] Copy structures."
 rsync -av --no-owner --no-group src/ "${STRAPI_DIR}"/src
 pushd "${STRAPI_DIR}"
  install -dv .tmp
  test -s ../"${ONTPUB_FAMILY:-dev}".db.template && rm -rf .tmp/data.db && cp -av ../"${ONTPUB_FAMILY:-dev}".db.template .tmp/data.db
  npm run build
 popd
fi
