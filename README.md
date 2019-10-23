# Foodier

## Que es

Es una app pensada para recomendar restaurantes a los usuarios que
deseen registrarse, claro que faltaria un formulario de registro o algo
asi, pero en este caso todo es por REST.

Los usuarios se suscribiran y cada semana les tendra que llegar un email
con las recomendaciones de la semana, estas recomendaciones son basadas
en la localizacion del usuario que envia al momento de suscribirse

## Como funciona

Para funcionar este obtiene un usuario como primer punto de contacto y
y a partir de este se obtienen todos los que esten a 2 km a la redonda y
a partir de ahi obtenemos la informacion de los restaurantes. Por que a
todos los que estan a 2 km?. Por que se considera que tambien estaran lo
suficientemente cerca para considerarse una recomendacion cercana.

Una vez que recomienda a todos, este pasa con los siguientes usuarios
saltando a los que ya han pasado, en teoria si hubiera usuarios a nivel
global estos recomendaria a todos los que esten dentro de un rango
determinado y seguiria hasta cubrir al todos los que esten dentro
enviando recomendaciones a cada uno basado en su lugar de residencia

## Features

- [x] Registro de usuarios por localizacion
- [x] Recomendaciones basadas en localizacion y precio maximo dispuesto a pagar
- [x] Enviar recomendaciones por email (Gmail)
- [ ] Refinar recomendaciones basada en los gustos a los que se les da click

## Desarrollo

### Requisitos

- Docker con docker-compose
- Make tool

### First run

Corre el comando `make` antes de todo, este descargara dependencias

### Ejecutar

Para correrlo de forma local usa el comando `make up`, este ejecutara el
docker-compose y creara todo lo necesario en el ambiente local, con
nodemon se tendra code reloading a la hora de editar le codigo

## Env vars

- PORT
- NODE_ENV
- ZOMATO_API_KEY (Se genera desde aqui [Zomato](https://developers.zomato.com/api))
- GMAIL_EMAIL son credenciales personales
- GMAIL_PASSWORD
- ACCESS_CONTROL_ALLOW_ORIGIN
- ACCESS_CONTROL_ALLOW_CREDENTIALS
- ACCESS_CONTROL_EXPOSE_HEADERS
- ACCESS_CONTROL_ALLOW_HEADERS
