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
 sed -i "s|\(port:.*\)$|\1 url: 'http://localhost:8080/${ONTPUB_FAMILY:-dev}/strapi',|g" "${STRAPI_DIR}/config/server.js"
 echo "[INFO] Copy structures: \"${PWD}/src/\" -> \"${STRAPI_DIR}/src\""
 rsync -a --no-owner --no-group src/ "${STRAPI_DIR}"/src
 pushd "${STRAPI_DIR}"
  npm run strapi admin:create-user -- --firstname="EDMC-DEV" --email="edmc-strapi@dev.com" --password="devDBonly1"
  test -s ../"${ONTPUB_FAMILY:-dev}".tar.gz && npm run strapi import -- -f ../"${ONTPUB_FAMILY:-dev}".tar.gz --force
  npm run build
 popd
fi
