<img src="https://github.com/edmcouncil/html-pages/raw/develop/general/assets/img/EDM-council-RGB_200w.png" width="200" align="right"/>

# html-pages general template

![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/nuxt.js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white) ![image](https://img.shields.io/badge/strapi-2F2E8B?style=for-the-badge&logo=strapi&logoColor=whitee) ![image](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![image](https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white) ![image](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![image](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white) ![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![image](https://img.shields.io/badge/Google%20Analytics-E37400?style=for-the-badge&logo=google%20analytics&logoColor=white) 

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
 # run strapi with dev settings(it automatically refresh panel when changes is detected)
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

## Configuring the app in strapi

This step is optional.

Frontend can be configured further using the strapi instance. You can change the logo, ontology repository url, resources URISpace and more.

To edit the configuration log in to your strapi instance that was created before and go to the `Content Manager` tab. There you will find the `Config` single type.

In the `Config` you can see the `ontologyLogo` image field, where you can upload custom logo and the `variables` JSON field. The variables field is filled with default values. Keep in mind that the keys are case sensitive.

The following values can be defined in `variables`:

- `uriSpace` - resources with IRI that start with the provided value will use path based routing, other resources will use the `?query=` routing. DEFAULT: `https://spec.edmcouncil.org/fibo/ontology/`

- `ontpubFamily` - ontology name which is mentioned in certain areas of the website. It should be the same as `ONTPUB_FAMILY` that will be provided through the command line later. DEFAULT: `fibo`

- `defaultBranchName` - name of the default ontology version branch. DEFAULT: `current`

- `ontoviewerServerUrl` - url or relative path to the onto-viewer backend. It should contain `{version}` string in it, which will be replaced with ontology version selected by user. DEFAULT: `/fibo/ontology/{version}/api/`

- `ontologyRepositoryUrl` - url to the ontology's repository. It is used in the "Report a problem" button to create issues. DEFAULT: `https://github.com/edmcouncil/fibo`

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


