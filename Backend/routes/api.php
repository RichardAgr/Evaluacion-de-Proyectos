<?php
/*
esto es un prueba de subir al git 2
*/
use App\Http\Controllers\TareaController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\EstudianteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\RevisionPlaniController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\SprintController;
use App\Models\RevisionPlani;
use App\Http\Controllers\EstudiantesEmpresasController;

Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/nombreEmpresa/{id}', [EmpresaController::class, 'getNombreEmpresa']);
Route::get('/empresas/', [EmpresaController::class, 'getListaEmpresas']);
Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);

//jhair
Route::put('/validar', [PlanificacionController::class, 'validar']);
Route::post('/addRevision', [PlanificacionController::class, 'addRevision']);

//Route::put('/prueba2', [RevisionPlaniController::class, 'testValidar']);



/** 
 * TODOS LOS GETS VAN ACA
*/

Route::get('/planificacion/notaComentario/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificacionAceptadas', [PlanificacionController::class, 'planificacionAceptadas']);
Route::get('/planificacionRechazadas', [PlanificacionController::class, 'planificacionRechazadas']);
Route::get('/tarea/{idTarea}', [TareaController::class, 'obtenerTarea']);
Route::get('/docente/empresa/{idEmpresa}', [PlanificacionController::class, 'obtenerDocentePorEmpresa']);
Route::get('/tareaFor/{idTarea}', [TareasController::class, 'obtenerTarea2']);
Route::get('/grupos', [GrupoController::class, 'obtenerTodosLosGrupos']);
Route::get('/grupo/{idGrupo}/participantes', [GrupoController::class, 'obtenerEstudiantesPorGrupo']);
Route::get('/grupoDescripcion/{idGrupo}', [GrupoController::class, 'getDescripcion']);
Route::get('/grupo/estudiantes/{idGrupo}/{gestionGrupo}', [GrupoController::class, 'obtenerEstudiantesPorGrupo']);
Route::get('/estudiante/sprint/semana/{idSprint}',[SprintController::class, 'sprintsSemanas']);
Route::get('/docente/obtenerEmpresasPorGrupoYDocente',[GrupoController::class, 'obtenerEmpresasPorGrupoYDocente']);
Route::get('/estudiante/getEstudiante/{idEstudiante}',[EstudianteController::class, 'obtenerEstudiantesParaEmpresa']);

/**
 * TODOS LOS POST VAN 
 *
 */
//Para crear la planificacion o modificarla
Route::post('/planificacion/guardar', [PlanificacionController::class, 'crearPlanificacion']);
// Ruta para crear una tarea
Route::post('/tarea/crear', [TareaController::class, 'store']);
//Para asignar grupos
Route::post('/asignarEstudiante', [EstudianteController::class, 'asignarEstudianteAGrupo']);
Route::post('/grupo/estudiante/barraBusqueda', [GrupoController::class, 'barraBusquedaEstudiante']);
Route::post('/grupo/docente/1/barraBusqueda', [GrupoController::class, 'barraBusquedaEmpresas']);

Route::post('/estudiante/crearEmpresa', [EstudiantesEmpresasController::class, 'crearEmpresa']);
