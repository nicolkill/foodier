# Foodier

Es una app pensada para recomendar restaurantes a los usuarios que
deseen registrarse, claro que faltaria un formulario de registro o algo
asi, pero en este caso todo es por REST.

Los usuarios se suscribiran y cada semana les tendra que llegar un email
con las recomendaciones de la semana, estas recomendaciones son basadas
en la localizacion del usuario que envia al momento de suscribirse

## Env vars

* PORT
* NODE_ENV
* ZOMATO_API_KEY (Se genera desde aqui [Zomato](https://developers.zomato.com/api))
* GMAIL_EMAIL son credenciales personales
* GMAIL_PASSWORD
* ACCESS_CONTROL_ALLOW_ORIGIN
* ACCESS_CONTROL_ALLOW_CREDENTIALS
* ACCESS_CONTROL_EXPOSE_HEADERS
* ACCESS_CONTROL_ALLOW_HEADERS
