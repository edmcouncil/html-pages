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

FROM	buildnpm AS htmlpages-develop-latest
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
ENV	PRODUCT		htmlpages
ENV	BRANCH_NAME	develop
ENV	TAG_NAME	latest
RUN	sed -i "s#\(\"\)https://spec.edmcouncil.org#\1#g" src/components/HeaderComponent.vue src/components/SlideCarousel.vue src/views/Home.vue && \
	npm --no-progress --no-color install && \
	npm --no-progress --no-color run build && \
	install -d /htmlpages/${BRANCH_NAME} && tar cJpf /htmlpages/${BRANCH_NAME}/${TAG_NAME}.tar.xz -C dist ${PRODUCT}

FROM	nginx:stable-alpine
ARG	FAMILY_REGEX
ENV	FAMILY_REGEX	${FAMILY_REGEX}
COPY	--from=htmlpages-develop-latest	/htmlpages/develop/latest.tar.xz /htmlpages/develop/latest.tar.xz
COPY	./nginx.conf			/etc/nginx/conf.d/default.conf
COPY	./99-upstream.sh		/docker-entrypoint.d/99-upstream.sh
RUN	chmod -c a+x /docker-entrypoint.d/99-upstream.sh
HEALTHCHECK --start-period=60s --interval=15s --timeout=1s --retries=60	CMD curl -f http://127.0.0.1/nginx_status
