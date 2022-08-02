FROM node:16-alpine

RUN apk update && \
    apk upgrade && \
    apk add git g++ gcc libgcc libstdc++ linux-headers make python3 && \
    apk update && \
    npm install npm@latest -g && \
    yarn global add @vue/cli

RUN install -dv /project
WORKDIR /project

COPY . .

RUN rm -rvf package-lock.json

RUN yarn install

ENV HOST=0.0.0.0
CMD ["yarn", "run", "serve"]
