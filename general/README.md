# html-pages general template

Strapi is used as a content managment system. This frontend application(html-pages/general) use strapi api to fetch data.

## General setup

- `nodejs v16.14.2`
- `postgresql v11` if you are not using development database in SQLite

## Strapi configuration for develop local run

- create directory for strapi instance for run (`strapiDir`)
- install strapi using quick start with no additional arguments 
    ```
    npx create-strapi-app@latest strapi-dashboard --quickstart
    ```
    for advanced options see strapi documentation [Strapi quick start](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html)
- after the installation and first run, close strapi and import the database and structure definition.
    - database (if you are not using a development database skip this point): 
        - development database in SQLite is located in directory `html-pages/general/strapi/.tmp/`, it should be copied to `strapiDir/.tmp/`
    - strapi structure definition: 
        - definitions is located in directory `html-pages/general/strapi/.src/`, all directories should be copied to `strapiDir/.src/` with replace option if needed
 - run strapi with one of the selected commands:
 
 ``` bash
 # run strapi with dev settings(it automaticly refresh panel when changes is detected)
 $ npm run develop
 
 # run strapi with prod settings
 $ npm run start
 ```

Admin pannel run default on: `http://localhost:1337/admin`
For admin panel with develop database login data is:

```js
login: edmc-strapi@dev.com
pwd: devDBonly1
```


## Build and run frontend

- create directory for frontend application instance

- clone code -> go to `general` directory

- install dependencies using: 

```bash
npm install
```

- run application with one of the selected block of commands

```bash
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

Application run default on: `http://localhost:3000`.

### Command line frontend properties

- `ONTPUB_FAMILY` - ontology name (default: fibo), ontology name is used as base url (base url is after host url ex. base url(`ONTPUB_FAMILY`)='fibo' runs application on `host:3000/fibo`)

- `PUBLIC_URL` - host url (default: localhost)

- `STRAPI_URL` - url to strapi instance (default: http://localhost:1337)

- `RESOURCES_BASE_URL` - resource base url (default: `BASE_URL` + `ONTPUB_FAMILY` + `/ontology/`)

- `SHOW_TERMS_LINK_ON_FOOTER` - show or hide terms links in footer (default: true)

- `PRODUCT`

- `BRANCH || BRANCH_NAME || TAG_NAME`

#### Example how to use properties in command line

```bash
$ set ONTOLOGY_NAME=auto && npm run dev
```


