Sistema basado en Registro y lista de tareas en una tabla

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [PHP](https://www.php.net/) (versión PHP 8)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (versión 20.12.1)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)

## Configuración del Proyecto Laravel (Backend)

1. Clona este repositorio en tu máquina local.

2. Navega a la carpeta del proyecto Laravel:

cd cobra_sistema

3. Configura las variables de entorno en el archivo `.env` según tu entorno local.

4. Instala las dependencias de PHP con Composer:
	composer install

5. Ejecuta las migraciones para crear las tablas en la base de datos:
	php artisan migrate

6. Inicia el servidor de desarrollo de Laravel - Puerto 8000:
	php artisan serve


## Configuración del Proyecto React JS (Frontend)
1. Navega a la carpeta del proyecto React JS:
cd frontend


2. Instala las dependencias de Node.js con npm o Yarn:
Instala las dependencias de Node.js con npm o Yarn:
npm install

3. Inicia el servidor de desarrollo de React JS:
npm start o npm run dev
