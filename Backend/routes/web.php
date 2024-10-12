<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\RevisionPlaniController;
use App\Models\RevisionPlani;

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

//Probando el web
Route::get('/grupo/estudiantes', [GrupoController::class, 'obtenerEstudiantesPorGrupo']);
Route::get('/grupo/empresas', [GrupoController::class, 'obtenerEmpresasPorGrupoYDocente']);


//HU Validar Planificion
Route::put('/validar', [PlanificacionController::class, 'validar']);
Route::put('/modificarValidar', [RevisionPlaniController::class, 'addRevision']);

//tests
//test HU Validar Planificacion
//test para modificar la BD, añadiendo comentarios y nota en una tabla intermedia
//anade o sobreescribe una revision
Route::get('/prueba', [RevisionPlaniController::class, 'testAdd']);
//test para verificar si la funcion Validar funciona correctamente
Route::get('/prueba2', [RevisionPlaniController::class, 'testValidar']);

Route::get('/token', function () {
    return csrf_token();
});
