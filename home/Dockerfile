FROM	node:18-alpine AS builder

ARG	NODE_ENV	development
ARG	ONTPUB_FAMILY
ARG	PRODUCT		htmlpages
ARG	BRANCH_NAME	develop
ARG	TAG_NAME	latest


RUN	apk --no-cache add --upgrade apk-tools bash curl jq rsync xz && apk --no-cache upgrade && \
	apk --no-cache add --virtual build-dependencies git g++ gcc libgcc libstdc++ linux-headers make && \
	npm install -g npm@latest && \
	npm install -g @vue/cli && \
	apk --no-cache del build-dependencies && \
	install -dv /opt && install -dv /strapi && \
	install -dv /project && ln -sf /project/node_modules/.bin /usr/local/sbin

ENV	ONTPUB_FAMILY	${ONTPUB_FAMILY}
ENV	PRODUCT		${PRODUCT}
ENV	BRANCH_NAME	${BRANCH_NAME}
ENV	TAG_NAME	${TAG_NAME}

ENV HOST	0.0.0.0
ENV NODE_PATH	/usr/local/lib/node_modules
ENV DISABLE_ESLINT_PLUGIN	true
ENV PUBLIC_URL	0.0.0.0
ENV NUXT_PORT	80
ENV NODE_ENV	${NODE_ENV}

WORKDIR /project
COPY	.	/project/
ENV NODE_OPTIONS	--openssl-legacy-provider
RUN	sed -i "s#\('\|\"\)https://spec.edmcouncil.org#\1#g" src/views/Home.vue && \
	npm --no-progress --no-color install && \
	npm --no-progress --no-color run build && \
	tar cJpf /html-pages.tar.xz -C dist htmlpages

FROM	nginx:stable-alpine
COPY	--from=builder		/html-pages.tar.xz /html-pages.tar.xz
COPY	./nginx.conf		/etc/nginx/conf.d/default.conf
COPY	./99-upstream.sh	/docker-entrypoint.d/99-upstream.sh
RUN	chmod -c a+x /docker-entrypoint.d/99-upstream.sh
HEALTHCHECK --start-period=60s --interval=5s --timeout=1s --retries=60	CMD curl -f http://127.0.0.1/nginx_status
