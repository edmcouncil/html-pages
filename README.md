<img src="https://vuejs.org/images/logo.png" width="100" align="right"/>

# spec.edmcouncil.org vue web pages 

# Updating the spec.edmcouncil.org websites

## Sources location

- FIBO Vue source code is located under: [html-pages/fibo/](./fibo/)
- AUTO Vue source code is located under: [html-pages/auto/](./auto/)


## Requirements

To run and/or build Vue application you need to have installed:

* [node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)
* [git client](https://git-scm.com/)

Some kind of code editor, along with a project in repository configuration files are provided for [Visual Studio Code](https://code.visualstudio.com/).

Run in console/terminal in main Vue folder ('fibo' or 'auto'):

```
yarn
```

It will execute yarn to fetch necessary packages and setup project files for you automatically.

## Running the content of website locally

By running
```
yarn serve
```
you can serve Vue application on your local machine. Also, Webpack will watch for changes in files and will rebuild application whenever any file will be changed.

Run in console/terminal in main Vue folder ([fibo](./fibo) or [auto](./auto)):

```
yarn serve
```

The address will be printed by the script but the default is:

```
localhost:8080/fibo
```

or 

```
localhost:8080/auto
```


## Editing the FIBO (AUTO) website content
Most static content is served as static HTML templates.

To find in what file content is hardcoded please refer to router.js file: [fibo/src/router.js](./fibo/src/router.js) (or [auto/src/router.js](./auto/src/router.js))


You can find an array of routes where by name and corresponding file name you can find a template for the desired route:

```
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/development',
      name: 'development',
      component: () => import(/* webpackChunkName: "development" */ './views/Development.vue'),
    },
```

In this file, there will be template html-like tag. Inside it, the template is stored for current view in almost raw HTML:

```
<template>
  <div class="container">
    <main>
      <article>
        <h1>
          <span>FIBO Development</span>
        </h1>

        <h2>
          FIBO is being developed in a continuous process by
          <a
            href="working-group.html#fibo-working-groups"
          >
            FIBO
            Content Teams (FCT)
          </a>. 
```
Most of the content is hardcoded in the template in HTML and can be easily edited. But some elements use dynamic aspects of the Vue framework and those elements will contain v- prefixed properties. Those elements should be edited with consideration of the Vue application lifecycle. For example:

```
        <input
          class="form-check-input"
          type="checkbox"
          name="edgesFilter"
          id="external"
          value="external"
          checked="true"
        />
```        
