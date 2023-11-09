ARG	NODE_ENV=development
ARG	BRANCH_NAME=develop
ARG	TAG_NAME=latest

FROM	node:18-alpine AS buildnpm
ARG	NODE_ENV BRANCH_NAME TAG_NAME
ENV	NODE_ENV="${NODE_ENV}" BRANCH_NAME="${BRANCH_NAME}" TAG_NAME="${TAG_NAME}" \
	HOST=0.0.0.0 \
	NODE_PATH=/usr/local/lib/node_modules \
	DISABLE_ESLINT_PLUGIN=true \
	PUBLIC_URL=0.0.0.0 \
	NUXT_PORT=80 \
	NODE_OPTIONS=--openssl-legacy-provider
RUN	apk --no-cache add --upgrade apk-tools bash curl jq rsync xz && apk --no-cache upgrade && \
	apk --no-cache add --virtual build-dependencies git g++ gcc libgcc libstdc++ linux-headers make && \
	npm install -g npm@latest && \
	apk --no-cache del build-dependencies && \
	install -dv /project && ln -sf /project/node_modules/.bin /usr/local/sbin

FROM	buildnpm
ARG	NODE_ENV BRANCH_NAME TAG_NAME ONTPUB_FAMILY
ENV	NODE_ENV="${NODE_ENV}"
WORKDIR /project
COPY	.	/project/
RUN	echo -e "ONTPUB_FAMILY=${ONTPUB_FAMILY}\nBRANCH_NAME=${BRANCH_NAME}\nTAG_NAME=${TAG_NAME}" > .env && \
	npm install && npm run build
CMD	["npm","run","dev"]
HEALTHCHECK --start-period=60s --interval=15s --timeout=1s --retries=60	CMD curl -f http://127.0.0.1/$(source /project/.env ; echo "${ONTPUB_FAMILY}")/gtm-custom.js
