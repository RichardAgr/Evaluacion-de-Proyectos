# Evaluacion-de-Proyectos
El sistema que se construirá tiene como objetivo la evaluación de proyectos que contara con funciones de seguimiento, observaciones, generar notificaciones y asignar a cada integrante de acuerdo su rol una funcion

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Cuentas](#Cuentas)
## Requisitos Previos

Lista de las dependencias y software necesario para correr tu proyecto.

- [Git](https://git-scm.com/) 
- [Node.js](https://nodejs.org/) v21.7.3 o superior
- [Composer](https://getcomposer.org/download/) v2.7.9 o superior
- [Mysql Workbech](https://dev.mysql.com/downloads/workbench/) v8.0 CE
- [XAMPP](https://sourceforge.net/projects/xampp/files/)  v8.2.12



## Instalación

Pasos detallados sobre cómo instalar y configurar el proyecto.

1. Elige un direccion para clonar el repositorio
2.  Clona el repositorio:
    ```bash
    git clone https://github.com/RichardAgr/Evaluacion-de-Proyectos.git
    ```
3. Abre bash si no tienes abre powershell si instalaste para poder usar bash en terminal, son los mismos comandos
4. Navega al directorio del proyecto:
    ```bash
    cd Evaluacion-de-
    ```
5. Navega al directorio del FrontEnd:
    ```bash
    cd frontend 
    ```
6. Instala las dependencias:
    ```bash
    npm install
    ```
7. Regresa a la direccion raiz del proyecto
   ```bash
    cd ..
   ```
8. Navega al directorio del backend en el proyecto
   ```bash
    cd backend
   ``` 
9. Instalacion dependencias Backend
   ```bash
    composer install
   ``` 
10. Configura las variables de entorno:
    -en la carpeta backend crea un archivo `.env`
    -abre el archivo .env
    -abre el archivo .env.example
    -copia todo de el contenido de .enx.example
    -pega lo copiado en .env
    -revisa si los puertos son correctos DB_HOST Y DB_PORT
    -pon el DB_USERNAME
    -pon el DB_PASSWORD
    -abre el bash
    ```bash
    php artisan key:generate
     ```
    
    ```bash
    php artisan migrate
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
3. Para iniciar el servidor de desarrollo:
   -Navegamos a la direccion del proyecto
   ```bash
    cd frontend
    ```
    ```bash
    npm start
    ```
5. Abre tu navegador en `http://localhost:5173`

## Cuentas
