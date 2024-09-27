<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;

Route::get('/', function () {
    return view('welcome');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/docente/empresa/{idEmpresa}', [PlanificacionController::class, 'obtenerDocentePorEmpresa']);

Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);
Route::get('/planificacionAceptadas', [PlanificacionController::class, 'planificacionAceptadas']);
Route::get('/planificacionRechazadas', [PlanificacionController::class, 'planificacionRechazadas']);
Route::get('/notas1/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificaciones/{idPlanificacion}/sprints', [PlanificacionController::class, 'showP']);
Route::post('/planificaciones1/{idPlanificacion}/sprints', [PlanificacionController::class, 'agregarSprint']);
Route::put('/planificacion2/{idPlanificacion}/{idSprint}', [PlanificacionController::class, 'modificarSprint']);

Route::post('/planificacionGestion', [PlanificacionController::class, 'gestionarPlanificacion']);


Route::get('/token', function () {
    return csrf_token(); 
});

/*Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return "Conexión exitosa a la base de datos: " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return "No se pudo conectar a la base de datos. Error: " . $e->getMessage();
    }
});*/