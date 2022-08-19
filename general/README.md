# html-pages general template

## General setup

- `nodejs v16.14.2`
- `postgresql v11` if you are not using development database in SQLite

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

## Command line frontend properties

- `ONTOLOGY_NAME` - ontology name (default: fibo)

- `PUBLIC_URL` - host url (default: localhost)

- `BASE_URL` - base after host url ex. BASE_URL='fibo' runs application on localhost:3000/fibo

- `STRAPI_URL` - url to strapi instance (default: http://localhost:1337)

- `RESOURCES_BASE_URL` - resource base url (default: https://spec.edmcouncil.org/fibo/ontology/)

- `SHOW_TERMS_LINK_ON_FOOTER` - show or hide terms links in footer (default: true)

- `PRODUCT`

- `BRANCH || BRANCH_NAME || TAG_NAME`

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
