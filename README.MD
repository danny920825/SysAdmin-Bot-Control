# SysAdmin Bot Control

## Herramienta para controlar aspectos basicos de la red desde un bot de Telegram

Se trata de un bot de Telegram capacitado para realizar operaciones basicas en una red. El bot esta en construcción. Por ahora solo funciona para habilitar el Escritorio Remoto utilizando la [API para pfsense](https://github.com/jaredhendrickson13/pfsense-api)

## Requisitos

* Nodejs (v17 es la version en la que se probo)
* Telegraf
* Axios

## Instalacion

* Clonar este repositorio
* `npm install` para instalar las dependencias
* Crear archivo .env para variables
* node bot.js

## Archivo .env

El archivo .env debe estar en la raiz del proyecto y contara con al menos las siguientes variables:

```TELEGRAM_TOKEN
PFSENSE_USER=admin
PFSENSE_PASSWORD=superpasswordaqui
PFSENSE_HOST=https://0.0.0.0/
USER_ID=1111111
```

El token es el que da el Botfather cuando solicitas un bot nuevo, las credenciales del pfsense debe ser de un usuario con permisos para crear y editar reglas. El User ID es utilizado para prevenir que el bot sea usado por personas ajenas al sysadmin o los administradores.

### Opciones del Escritorio Remoto

* Habilitar RDP. Se conecta al pfsense y crea una regla basica en el apartado de Nat Port_Forward habilitando el Escritorio Remoto (MS_RDP) por el puerto 3389 (MS_RDP) apuntando a la IP que se desee. Se puede editar la IP manualmente (recomendado) o pasarla como variable (no recomendado porque es solo 1 ocurrencia ahora mismo)

* Revisar el estado del RDP. Se conecta al pfsense y establece una busqueda en el apartado de Nat Port_Forward revisando si existe alguna regla en el puerto 3389. En ese caso, devuelve un objeto con toda la informacion disponible.

* Deshabilitar RDP. Se conecta al pfsense y busca si hay alguna regla para el RDP (usando la configuracion anterior) y obtiene el ID. Elimina todas las ocurrencias de reglas con `local-port:3389`.
