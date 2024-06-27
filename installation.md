# SISTEMA ANAR

#### Desarrollador
- Arturo Yepez

## Descripción

## Instalación

### Requisitos de uso
Para poder ejecutar el proyecto, se debe de tener instalado en el equipo las siguientes dependencias de programas con sus respectivas versiones:
* node >= 16.0.0
* npm >= 7.14.0
* mysql == 8.0.31

En caso de no poseer los requisitos de uso, se recomienda instalar las versiones más recientes de los programas mencionados.

#### node y npm

Para el caso de NodeJS, se recomienda instalar un manejador de versiones como `nvm` o `n` para poder cambiar entre versiones de NodeJS de manera sencilla.

Se puede encontrar mas informacion sobre el proceso de instalacion en: [https://nodejs.org/en/learn/getting-started/how-to-install-nodejs](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs/)

#### Clonar el repositorio

Para poder inicializar el proyecto es necesario poseer una copia del repositorio en tu equipo (maquina local). Para ello, debemos de clonar el repositorio en la carpeta donde deseamos trabajar.

En caso de no conocer el proceso de clonacion de un repositorio, se recomienda visitar la siguiente pagina: [https://phoenixnap.com/kb/git-clone-ssh](https://phoenixnap.com/kb/git-clone-ssh)

Se recomienda que el proceso de clonacion del repositorio se realice utilizando el protocolo SSH, dado que la plataforma de Github hizo obsoleto el modo de autenticacion HTTPS mediante linea de comandos.

### Instalación de Dependencias

Una vez tengamos los requisitos de uso cubiertos, procedemos a instalar las dependencias del proyecto. Para ello, debemos de correr los siguientes comandos en la terminal (debemos de estar ubicados en la raiz del proyecto):

1. Instalar las dependencias del proyecto:
```bash
npm install
```
1. Crear un archivo `.env` en la raiz del proyecto con las variables de entorno necesarias para la ejecucion del proyecto. Se recomienda copiar el contenido del archivo `.env.sample` y modificar los valores de las variables de entorno segun sea necesario.
1. Hacer "build" del proyecto:
```bash
npm run build
```

### Comandos Disponibles

Una vez instaladas las dependencias del proyecto (y hecho el build), podemos utilizar los siguientes comandos para trabajar con el proyecto:

* `dev`: Es utilizado para crear un servidor de desarrollo que "escucha" los cambios en todos los archivos disponibles dentro del proyecto, para que cuando detecte un cambio automaticamente se reinicie sin necesidad de algún input extra.
* `start`: Comienza un servidor con la ultima versión del proyecto construida.
* `test`: Ejecuta Jest y todas las pruebas unitarias disponibles dentro del proyecto (ubicadas dentro del directorio `/test`).
  * `test:unit`: Ejecuta las pruebas unitarias de Jest.
* `init`: Ejecuta un script para instalar todos los valores por defecto necesarios para poder inicializar el Sistema ANAR. Entre las instancias que se inician y se guardan en la base de datos, estas incluyen: Aplicaciones, Algoritmo de Hash por defecto, 1 usuario de prueba.

Si se va a desarrollar contenido nuevo para la aplicación, se recomienda encarecidamente utilziar: `npm run dev` como comando sobre el que trabajar.

### Postman

Para poder probar las rutas del proyecto, se recomienda utilizar Postman: una plataforma API para facilitar la construccion y documentacion de APIs. Esta herramienta permite a los desarrolladores crear solicitudes HTTP y probar las respuestas de las APIs de una forma sencilla y efectiva. Se puede encontrar el link de descarga en: [https://www.postman.com/](https://www.postman.com/).

Este proyecto, cuenta dentro del directorio `resources/` con un archivo de configuracion de Postman que contiene todas las rutas del proyecto. Se recomienda importar este archivo en Postman para poder probar las rutas del proyecto de manera sencilla.