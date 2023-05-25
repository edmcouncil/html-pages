#!/bin/bash

STRAPI_DIR="db/${ONTPUB_FAMILY:-dev}strapi"

install -dv "$(dirname "${STRAPI_DIR}")"
if [ ! -e "${STRAPI_DIR}" ] ; then
 echo "[INFO] Install strapi in \"${STRAPI_DIR}\" without run."
 npx create-strapi-app@latest "${STRAPI_DIR}" --quickstart --no-run
 sed -i "s|\(port:.*\)$|\1 url: '/${ONTPUB_FAMILY:-dev}/strapi',|g" "${STRAPI_DIR}/config/server.js"
 echo "[INFO] Copy structures."
 rsync -av --no-owner --no-group src/ "${STRAPI_DIR}"/src
 pushd "${STRAPI_DIR}"
  npm run build
 popd
fi

