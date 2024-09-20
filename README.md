# Evaluacion-de-Proyectos
El sistema que se construirá tiene como objetivo la evaluación de proyectos que contara con funciones de seguimiento, observaciones, generar notificaciones y asignar a cada integrante de acuerdo su rol una funcion

# Readme para poder ejecutar la base de datos.
Tutorial.
Entrar al C:\xampp\php\php.ini y buscar zip
y cambiar el ;extension=zip a extension=zip

Ir a phpmyadmin y dar a importar: Importar la la base.

Instalar composer. bash: 
cd backend
composer install
composer touch .env

-- Se crea el .env y pegar
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=basededatos
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"


php artisan key:generate
php artisan migrate

artisan serve
cd frontend
npm start
