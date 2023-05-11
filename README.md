<img src="https://github.com/edmcouncil/html-pages/raw/develop/general/assets/img/EDM-council-RGB_200w.png" width="200" align="right"/>

# html-pages

This repository contains page templates used in EDMC projects. 

For details, go to the appropriate folder and read the README file contained therein:

- [/general](./general/README.md) - includes nuxt-based page templates, uses strapi as content management system
- [/home](./home/README.md) - contains the home page, written using vue, without the involvement of strapi

## Run with command line

To run individual pages from the command line, look at the README files given above.

## Run with docker

Using docker compose, the pages run without additional user intervention. The script sets up and copies all the basic files necessary to run on its own.
The script prepare and publish on localhost 3 pages: 
- `home` - templates on `http:localhost:8080`
- `general` - templates on `http:localhost:8081/fibo`
- `strapi` - required service for `general` pages with fibo database on `http://localhost:1337/admin`

To start and rebuild all containers use command:

```
$ docker-compose up --build -d
```

You can see all running containers and their status:

```
$ docker compose ps

NAME                   IMAGE                COMMAND                  SERVICE             CREATED             STATUS              PORTS
html-pages-general-1   html-pages-general   "docker-entrypoint.s…"   general             20 seconds ago      Up 17 seconds       0.0.0.0:8081->3000/tcp
html-pages-home-1      html-pages-home      "docker-entrypoint.s…"   home                7 hours ago         Up 4 minutes        0.0.0.0:8080->8080/tcp
html-pages-strapi-1    html-pages-strapi    "docker-entrypoint.s…"   strapi              4 hours ago         Up 17 seconds       0.0.0.0:1337->1337/tcp
```

If you want to see logs from one container use:

```
# to view continuous log output
$ docker logs --follow <container name>

# to view specific amount of logs
$ docker logs --tail <amount> <container name>
```

Killing containers takes one command: 

```
$ docker-compose down
```
You could also run docker-compose without detached mode(without -d). If so, you'll just use '^C' to kill all containers.
