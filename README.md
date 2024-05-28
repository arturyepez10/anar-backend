# SISTEMA ANAR
#### Autores
- Ruby Valencia
- Alejandro Amaro
- Arturo Yepez

#### Desarrollador
- Arturo Yepez

## Descripción
El **Sistema ANAR** es una capa de desarrollo *Back-End*, creada para el Archivo Nacional de Arte Rupestre por parte de estudiantes de la Universidad Simón Bolívar como parte del desarrollo de un proyecto de Servicio Comunitario.

Este sistema se desarrollo en primera instancia para que sirviera de apoyo al proyecto de ANAR juego de "Memoria Rupestre", debido a sus necesidades de realizar una migración de sus sistemas para la utilización de Bases de Datos relacionales, como lo puede ser MySQL. Además, sirve como proyecto piloto para un sistema con capacidad de ser expandido para poder utilizarse en un futuro con las otras aplicaciones y/o proyectos de ANAR.

## Instalación

#### Requisitos de uso
Para poder ejecutar el proyecto, se debe de tener instalado en el equipo las siguientes dependencias de programas con sus respectivas versiones:
* node >= 16.0.0
* npm >= 7.14.0
* mysql == 8.0.31

#### Instalación de Dependencias
Una vez se cumplan los requisitos de instalación, se debe correr el siguiente comando para instalar todas las librerias que usa el programa para su ejecución:
```bash
npm install

# También es posible, si desea utilizar `yarn`como instalador
yarn install
```

#### Comandos Disponibles
El proyecto cuenta con una serie de comandos disponibles que el desarrollador puede utilizar. Todos los comandos deben llevar como prefijo la expresión:
```bash
npm run {{ COMANDO }}
```

Ahora, la lista de comandos disponibles incluye:

* `dev`: Es utilizado para crear un servidor de desarrollo que "escucha" los cambios en todos los archivos disponibles dentro del proyecto, para que cuando detecte un cambio automaticamente se reinicie sin necesidad de algún input extra.
* `build`: Crea una version estatica del proyecto en version de producción. Esto implica que se hacen algunas optimizaciones que no están disponibles en el servidor de desarrolladores
* `start`: Comienza un servidor con la ultima versión del proyecto construida.

Si se va a desarrollar contenido nuevo para la aplicación, se recomienda encarecidamente utilziar: `npm run dev` como comando sobre el que trabajar.

#### Variables de Entorno
Para la utilización del Sistema ANAR, se hace uso de variables de entorno para las conexiones que dependan de información sensible como lo pueden ser credenciales de bases de datos, información de ambiente de desarrollo, clave de encriptación para autenticación, etc.

Al momento de instalar el proyecto, ninguna variable de entorno estará configurada. Sin embargo, dentro del proyecto se encuentra un archivo `.env.sample` donde se encuentra una **lista inicial de variables de entorno que necesita el proyecto para operar con normalidad**.

Si estas instalando el proyecto, ponte en contacto con otro desarrollador para conocer los valores de cada variable en el contexto/ambiente que desees.

Ahora, en caso de que sea necesario agregar una nueva variable de entorno al proyecto el archivo `.env.sample` **debe de mantenerse al día** para evitar confusiones a futuros desarrolladores.

Todas las variables de entornos son cargadas como un archivo de configuracion que puedes encontrar en la siguiente ruta dentro del proyecto: `config/index.ts`, de tal forma que debe utilizarse ese archivo al querer hacer referencia a una variable de entorno dentro del proyecto.