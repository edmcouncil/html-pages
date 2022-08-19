# html-pages general template

## Build and run frontend

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Strapi configuration for develop local run

To run strapi locally, you need to go [Strapi quick start](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html) and after install and first run, close strapi app and import database and structure definition into strapi directories. Instruction are below.

Dev database with some examples is in directory `/strapi/.tmp/`. Database to use need to been copied to the stapi `.tmp` directory when u use SQLite.

Components with definition of strapi structures and default api options can be imported into the strapi directory `/.src/`, all required directories is available in `/strapi/.src` copy paste it with replace option if needed.

For admin panel with develop database login data is:

```js
login: edmc-strapi@dev.com
pwd: devDBonly1
```

Admin pannel run default on: `localhost:1337/admin`
