<img src="https://github.com/edmcouncil/html-pages/raw/develop/general/assets/img/EDM-council-RGB_200w.png" width="200" align="right"/>

# html-pages

This repository contains page templates used in EDMC projects. 

For details, go to the appropriate folder and read the README file contained therein:

- [/general](./general/README.md) - includes nuxt-based page templates, uses strapi as content management system
- [/home](./home/README.md) - contains the home page, written using vue, without the involvement of strapi

## Run with command line

To run individual pages from the command line, look at the README files given above.

## Run with docker

Requirements:
- [git](https://git-scm.com/) ([install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- [docker](https://www.docker.com/) - install:
  * [Docker Desktop](https://docs.docker.com/desktop/) or ...
  * [Docker Engine](https://docs.docker.com/engine/) with [Docker Compose plugin](https://docs.docker.com/compose/install/linux/)
- free port **8080/tcp**

Clone the [edmcouncil/html-pages](https://github.com/edmcouncil/html-pages) repository to the *html-pages* directory,
go to the *html-pages* directory (run all subsequent commands inside this directory),
then build the images (or pull from the registry if available) and run the containers:
```bash
git clone https://github.com/edmcouncil/html-pages html-pages

cd html-pages

docker compose build
# alternatively pull images from registry if available
#docker compose pull --ignore-pull-failures

docker compose up -d
```

After some time, check the status of running containers:
```
docker compose ps
```

if they work correctly, the following message will appear:
> NAME                       IMAGE                    COMMAND                  SERVICE             CREATED              STATUS                        PORTS
> html-pages-fibo-pages-1    edmcouncil/fibo-pages    "docker-entrypoint.s…"   fibo-pages          About a minute ago   Up About a minute (healthy)
> html-pages-fibo-strapi-1   edmcouncil/fibo-strapi   "docker-entrypoint.s…"   fibo-strapi         About a minute ago   Up About a minute (healthy)
> html-pages-spec-1          edmcouncil/spec          "/docker-entrypoint.…"   spec                About a minute ago   Up About a minute (healthy)   0.0.0.0:8080->80/tcp, :::8080->80/tcp

The STRAPI instance database is inside the `fibo-strapi` container image, so any changes will be lost when stopped.
If you want a "permanent" database, see [comment](./docker-compose.yaml#) in the `docker-compose.yaml` file
and uncomment the following line in the `.services.fibo-strapi.volumes` section:
```
     - ./general/strapi/db:/strapi
```

The services provide endpoints at the following URLs:
- [http://localhost:8080](http://localhost:8080) :- [html-pages home page](https://github.com/edmcouncil/html-pages/blob/develop/home/README.md)
- [http://localhost:8080/fibo](http://localhost:8080/fibo) :- [html-pages general template](https://github.com/edmcouncil/html-pages/tree/develop/general) for [FIBO](https://github.com/edmcouncil/fibo) ontology
- [http://localhost:8080/fibo/strapi/admin](http://localhost:8080/fibo/strapi/admin) :- [Strapi admin panel](https://docs.strapi.io/user-docs/intro#accessing-the-admin-panel) for for [FIBO](https://github.com/edmcouncil/fibo) ontology (Email: *edmc-strapi@dev.com*, Password: *devDBonly1*)

If you want to see logs from one *<SERVICE>* (`fibo-pages`, `fibo-strapi` or `spec`), use:
```bash
# to view continuous log output for <SERVICE>=fibo-pages
docker compose logs --follow fibo-pages

# to view *100* latest log lines for <SERVICE>=fibo-strapi
docker compose logs --tail 100 fibo-strapi
```

Stop the services with the command:
```bash
docker compose down
```

Remove all images and volumes with the command:
```bash
docker compose down --rmi all -v
```
