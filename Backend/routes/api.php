<?php
/*
esto es un prueba de subir al git 2
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\EstudianteController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
/** 
 * TODOS LOS GETS VAN ACA
*/

Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);
Route::get('/planificacion/notaComentario/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificacionAceptadas', [PlanificacionController::class, 'planificacionAceptadas']);
Route::get('/planificacionRechazadas', [PlanificacionController::class, 'planificacionRechazadas']);
Route::get('/tarea/{idTarea}', [TareaController::class, 'obtenerTarea']);
Route::get('/docente/empresa/{idEmpresa}', [PlanificacionController::class, 'obtenerDocentePorEmpresa']);
Route::get('/tareaFor/{idTarea}', [TareasController::class, 'obtenerTarea2']);
Route::get('/grupos', [GrupoController::class, 'obtenerTodosLosGrupos']);
Route::get('/grupo/{idGrupo}/participantes', [GrupoController::class, 'obtenerEstudiantesPorGrupo']);
Route::get('/grupoDescripcion/{idGrupo}', [GrupoController::class, 'getDescripcion']);

/**
 * TODOS LOS POST VAN ACA
 */
//Para crear la planificacion o modificarla
Route::post('/planificacion/guardar', [PlanificacionController::class, 'crearPlanificacion']);
// Ruta para crear una tarea
Route::post('/tarea/crear', [TareaController::class, 'store']);
//Para asignar grupos
Route::post('/asignarEstudiante', [EstudianteController::class, 'asignarEstudianteAGrupo']);
