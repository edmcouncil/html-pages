ARG	NODE_ENV=development
ARG	BRANCH_NAME=develop
ARG	TAG_NAME=latest

FROM	node:20-alpine AS buildnpm
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
	npm install -g @vue/cli && \
	apk --no-cache del build-dependencies && \
	install -dv /project && ln -sf /project/node_modules/.bin /usr/local/sbin

FROM	buildnpm AS htmlpages
ARG	NODE_ENV BRANCH_NAME TAG_NAME
ENV	NODE_ENV="${NODE_ENV}" BRANCH_NAME="${BRANCH_NAME}" TAG_NAME="${TAG_NAME}" \
	PRODUCT=htmlpages
WORKDIR /project
COPY	.	/project/
RUN	sed -i "s#\(\"\)https://spec.edmcouncil.org#\1#g" src/components/HeaderComponent.vue src/components/SlideCarousel.vue src/views/Home.vue && \
	npm --no-progress --no-color install && \
	npm --no-progress --no-color run build && \
	install -d /htmlpages/${BRANCH_NAME} && tar cJpf /htmlpages/${BRANCH_NAME}/${TAG_NAME}.tar.xz -C dist ${PRODUCT}

FROM	nginx:stable-alpine
ARG	BRANCH_NAME TAG_NAME FAMILY_REGEX
ENV	FAMILY_REGEX="${FAMILY_REGEX}"
COPY	--from=htmlpages		/htmlpages/${BRANCH_NAME}/${TAG_NAME}.tar.xz /htmlpages/${BRANCH_NAME}/${TAG_NAME}.tar.xz
COPY	./nginx.conf			/etc/nginx/conf.d/default.conf
COPY	./99-upstream.sh		/docker-entrypoint.d/99-upstream.sh
RUN	chmod -c a+x /docker-entrypoint.d/99-upstream.sh && \
	echo -e "BRANCH_NAME=${BRANCH_NAME}\nTAG_NAME=${TAG_NAME}" > /docker-entrypoint.d/.env
HEALTHCHECK --start-period=60s --interval=15s --timeout=1s --retries=60	CMD curl -f http://127.0.0.1/nginx_status
