<img src="https://vuejs.org/images/logo.png" width="100" align="right"/>

# spec.edmcouncil.org vue web pages 

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
### Requirements:

* [docker](https://docs.docker.com/get-docker/)
* [docker-compose](https://docs.docker.com/compose/install/)

### Deploy [OKG HOME](./home) with docker-compose

```
docker-compose --profile home up -d
```
If you run the above against a clean repo, it should produce the following log:
```
Creating network "html-pages_default" with the default driver
Building home
Sending build context to Docker daemon  18.86MB
Step 1/9 : FROM node:12-alpine
...
Creating html-pages_home_1 ... done
```
Note that if you make changes related to project dependencies (e.g. updating some vue components) in the existing local repo, you need to build docker image first:
```
docker-compose --profile=home build
```

Listing containers must show one container running and the port mapping as below:
```
docker-compose ps
      Name                     Command               State                    Ports                  
-----------------------------------------------------------------------------------------------------
html-pages_home_1   docker-entrypoint.sh yarn  ...   Up      0.0.0.0:8080->8080/tcp,:::8080->8080/tcp
```

After the application starts, navigate to [http://localhost:8080](http://localhost:8080) in your web browser.

Stop and remove the containers:
```
docker-compose down
Stopping html-pages_home_1 ... done
Removing html-pages_home_1 ... done
Removing network html-pages_default
```

### Deploy [FIBO HOME](./fibo) with docker-compose
Similarly to running home profile, you need to run:
```
docker-compose --profile fibo up -d
```
And if you make changes related to project dependencies (e.g. updating some vue components) in the existing local repo, before starting the Docker container you need to run this:
```
docker-compose --profile=fibo build
```

Listing containers must show one container running and the port mapping as below:
```
docker-compose ps
      Name                     Command               State                    Ports                  
-----------------------------------------------------------------------------------------------------
html-pages_fibo_1   docker-entrypoint.sh yarn  ...   Up      0.0.0.0:8080->8080/tcp,:::8080->8080/tcp
```

After the application starts, navigate to [http://localhost:8080/fibo](http://localhost:8080/fibo) in your web browser.

Stop and remove the containers:
```
docker-compose down
Stopping html-pages_fibo_1 ... done
Removing html-pages_fibo_1 ... done
Removing network html-pages_default
```

### Deploy [AUTO HOME](./auto) with docker-compose
Similarly to running fibo profile, you need to run:
```
docker-compose --profile auto up -d
```
Again, you may need to run this beforehand:
```
docker-compose --profile=auto build
```
Listing containers must show one container running and the port mapping as below:
```
docker-compose ps
      Name                     Command               State                    Ports                  
-----------------------------------------------------------------------------------------------------
html-pages_auto_1   docker-entrypoint.sh yarn  ...   Up      0.0.0.0:8080->8080/tcp,:::8080->8080/tcp
```
After the application starts, navigate to [http://localhost:8080/auto](http://localhost:8080/auto) in your web browser.

Stop and remove the containers:
```
docker-compose down
Stopping html-pages_auto_1 ... done
Removing html-pages_auto_1 ... done
Removing network html-pages_default
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
