<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Empresa\EmpresaController;
use App\Http\Controllers\Empresa\PlanificacionController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\Docente\GrupoController;
//use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\ControllersGlobal\Estudiante\EstudianteController;
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
//Route::get('/grupo/estudiantes/{idGrupo}/{gestionGrupo}', [GrupoController::class, 'obtenerEstudiantesPorGrupo']);
Route::get('/grupo/empresas/{idDocente}/{gestionGrupo}', [GrupoController::class, 'obtenerEmpresasPorGrupoYDocente']);


//barra de busqueda


//HU Validar Planificion
Route::put('/validar', [PlanificacionController::class, 'validar']);
Route::get('/prueba', [PlanificacionController::class, 'testAdd']);

Route::get('/token', function () {
    return csrf_token();
});