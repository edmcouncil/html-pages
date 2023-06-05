ARG	NODE_ENV	development

FROM	node:18-alpine AS buildnpm
ARG	NODE_ENV
ENV	NODE_ENV	${NODE_ENV}
RUN	apk --no-cache add --upgrade apk-tools bash curl jq rsync xz && apk --no-cache upgrade && \
	apk --no-cache add --virtual build-dependencies git g++ gcc libgcc libstdc++ linux-headers make && \
	npm install -g npm@latest && \
	npm install -g @vue/cli && \
	apk --no-cache del build-dependencies && \
	install -dv /project && ln -sf /project/node_modules/.bin /usr/local/sbin

FROM	buildnpm
ARG	NODE_ENV
ENV	NODE_ENV	${NODE_ENV}
ENV HOST	0.0.0.0
ENV NODE_PATH	/usr/local/lib/node_modules
ENV DISABLE_ESLINT_PLUGIN	true
ENV PUBLIC_URL	0.0.0.0
ENV NUXT_PORT	80
ENV NODE_OPTIONS	--openssl-legacy-provider
WORKDIR /project
COPY	.	/project/
ARG	ONTPUB_FAMILY
ARG	BRANCH_NAME	develop
ARG	TAG_NAME	latest
RUN	echo -e "ONTPUB_FAMILY=${ONTPUB_FAMILY}\nBRANCH_NAME=${BRANCH_NAME}\nTAG_NAME=${TAG_NAME}" > .env
RUN	bash setup.sh
CMD	["bash","entrypoint.sh"]
HEALTHCHECK --start-period=60s --interval=15s --timeout=1s --retries=60	CMD curl -q http://localhost:1337/admin/project-type | jq -e ".data.features"
