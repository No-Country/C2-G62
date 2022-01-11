# Backend

Este repositorio contiene el código del backend que demuestra como esta estructurado el login, register y autenticación con JWT,
para distribuir mediante los otros endpoints el trabajo estructurado.

## Prerequisitos

- Tener instalado NodeJS Lts la versión más actual posiblemente, la versión que se hizo este backend fue v14.17.6
  para mirar tu versión presiona `node -v` en tu línea de comandos

- Instalar extensiones de VS Code para simplificar trabajo entre las que usamos:

1. Prettier
2. REST Client
3. Material Icon Theme
4. ESLint

## Configurar e instalar entorno

1. Clonar repositorio `$ git clone https://github.com/No-Country/C2-G62.git`
2. Introducirse entre el arbol de directorios hasta la carpeta `backend`
3. Empezar a instalar las dependencias del proyecto con el comando `npm i` desde la carpeta `backend`
4. Descargar las credenciales del archivo `.env` y colocarla dentro de la carpeta `backend`
5. Tener previamente instalado y configurado MySQL `https://www.digitalocean.com/community/tutorials/como-instalar-mysql-en-ubuntu-18-04-es`
6. `npm run dev`

- En caso de querer probar los endpoints puedes hacerlo mediante REST Client en la carpeta request, con postman u consultando directamente desde el frontend al hostname correspondiente teniendo en cuenta que tanto el front como el back deben estar corriendo al momento.

### Variables de entorno en .env

| Variable Name          | Descripción                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| PORT                   | Puerto donde va a correr el proyecto                               |
| DB_HOST                | Hostname de donde corre la base de datos                           |
| DB_USER                | Usuario de la base de datos                                        |
| DB_PASSWD              | Contraseña del usuario de la base de datos                         |
| DB_NAME                | Nombre de la base de datos                                         |
| SECRET_JWT_SEED        | Texto para generar semialetoriedad de la clave del token de acceso |
| SECRET_REFRESHJWT_SEED | Texto para generar semialetoriedad de la clave de token refresh    |

## Autenticación

- La autenticación es manejada con JWT mediante los headers `x-token-auth` y `x-token-refresh`
- Ir a la documentación para mirar los endpoints en postman

## Soporte

En caso de haber problema nuestros desarolladores estan capacitados para ayudarte. Encuentra más informción en el grupo de slack c2-62-t
