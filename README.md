# Evaluacion-de-Proyectos
El sistema que se construirá tiene como objetivo la evaluación de proyectos que contara con funciones de seguimiento, observaciones, generar notificaciones y asignar a cada integrante de acuerdo su rol una funcion

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
   - [Clonar el Repositorio](#1-clonar-el-repositorio)
   - [Abrir una Terminal](#2-abrir-una-terminal)
   - [Navegar al Directorio del Proyecto](#3-navegar-al-directorio-del-proyecto)
   - [Configurar el Frontend](#4-configurar-el-frontend)
   - [Volver a la Raíz del Proyecto](#5-volver-a-la-raíz-del-proyecto)
   - [Configurar el Backend](#6-configurar-el-backend)
   - [Configurar las Variables de Entorno](#7-configurar-las-variables-de-entorno)
   - [Generar la Clave de la Aplicación](#8-generar-la-clave-de-la-aplicación)
   - [Configurar la Base de Datos](#9-configurar-la-base-de-datos)
   - [Conectar la Base de Datos a la Ruta de Archivos](#10-conectar-la-base-de-datos-a-la-ruta-de-archivos)
3. [Uso](#uso)
4. [Cuentas](#cuentas)

## Requisitos Previos

Lista de las dependencias y software necesario para correr tu proyecto.

- [Git](https://git-scm.com/) 
- [Node.js](https://nodejs.org/) v21.7.3 o superior
- [Composer](https://getcomposer.org/download/) v2.7.9 o superior
- [Mysql Workbech](https://dev.mysql.com/downloads/workbench/) v8.0 CE
- [XAMPP](https://sourceforge.net/projects/xampp/files/)  v8.2.12



## Instalación

Sigue estos pasos para instalar y configurar el proyecto.

###### 1. Clonar el Repositorio


1. Clonar el Repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/RichardAgr/Evaluacion-de-Proyectos.git
```

###### 2. Abrir una Terminal

Abre una terminal (puedes usar Bash o PowerShell) para ejecutar los comandos.

###### 3. Navegar al Directorio del Proyecto

Accede a la carpeta raíz del proyecto:

```bash
cd Evaluacion-de-Proyectos
```

###### 4. Configurar el Frontend

1. Navega al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias de Node.js:

   ```bash
   npm install
   ```

###### 5. Volver a la Raíz del Proyecto

Vuelve al directorio raíz del proyecto:

```bash
cd ..
```

###### 6. Configurar el Backend

1. Navega al directorio del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias de PHP:

   ```bash
   composer install
   ```

###### 7. Configurar las Variables de Entorno

1. Crea un archivo `.env` en el directorio `backend`:

   ```bash
   cp .env.example .env
   ```

2. Abre el archivo `.env` y configura los siguientes parámetros:
   - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` según tu configuración.

###### 8. Generar la Clave de la Aplicación

Ejecuta el siguiente comando para generar la clave de la aplicación:

```bash
php artisan key:generate
```

###### 9. Configurar la Base de Datos

1. Si no tienes la base de datos, ejecuta el siguiente comando para crear la estructura:

   ```bash
   php artisan migrate
   ```

2. Si ya tienes la base de datos y deseas actualizarla, ejecuta:

   ```bash
   php artisan migrate:fresh
   ```

3. Pobla la base de datos con datos de ejemplo:

   ```bash
   php artisan db:seed
   ```

###### 10. Conectar la Base de Datos a la Ruta de Archivos

1. Navega al directorio `public` dentro del backend y elimina la carpeta `storage`.

2. Vuelve al directorio `backend` y ejecuta el siguiente comando para crear un enlace simbólico entre el almacenamiento y la carpeta pública:

   ```bash
   php artisan storage:link
   ```

## Uso

Instrucciones básicas sobre cómo ejecutar el proyecto.

1. Para iniciar la coneccion con la Backend-frontend-BD
   -Navegamos a la direccion del proyecto
    ```bash
    cd backend
    ```
    ```bash
    php artisan serv
    ```
2. Para iniciar el servidor de desarrollo:
   -Navegamos a la direccion del proyecto
   ```bash
    cd frontend
    ```
    ```bash
    npm start
    ```
3. Abre tu navegador el siguiente link, `http://localhost:5173`  si no tienes otro proyecto vite corriendo 

## Cuentas
DOCENTE:   
   'nombreCuenta' = 'letiGod'
   'contrasena' = 'Password1'
   
   'nombreCuenta' = 'corina123'
   'contrasena' = 'Password2'
   
   'nombreCuenta' = 'griego123'
   'contrasena' = 'Password3'

Estudiante: 
  ['agarcia', 'passAna1'],
  ['lhernandez', 'passLuis2'],
  ['jmendez', 'passJuan3'],
  ['srodriguez', 'passSofia4'],
  ['cdiaz', 'passCarlos5'],
  ['lmorales', 'passLucia6'],
  ['dcruz', 'passDavid7'],
  ['emartinez', 'passElena8'],
  ['jlopez', 'passJorge9'],
  ['pperez', 'passPaula10'],
  ['acastro', 'passAntonio11'],
  ['mfernandez', 'passMaria12'],
  ['rmolina', 'passRaquel13'],
  ['fcarrasco', 'passFelipe14'],
  ['scampos', 'passSara15'],
  ['malonso', 'passMiguel16'],
  ['cmoreno', 'passClaudia17'],
  ['areyes', 'passAntonio18'],
  ['ivega', 'passIsabel19'],
  ['aflores', 'passAlberto20'],
  ['rmontes', 'passRosa21'],
  ['tvillar', 'passTomas22'],
  ['squintana', 'passSandra23'],
  ['hpena', 'passHugo24'],
  ['vjoaco', 'passJoaco25'],
  ['aricky', 'passRicky26'],
  ['jsilva', 'passJuan27'],
  ['cgomez', 'passClara28'],
  ['dsantos', 'passDiego29'],
  ['eperez', 'passElena30'],
  ['framos', 'passFernando31'],
  ['mlopez', 'passMaria32']
