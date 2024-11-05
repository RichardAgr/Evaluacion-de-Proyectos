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
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\EstudiantesEmpresasController;
use App\Http\Controllers\NotaSprintController;
use App\Http\Controllers\EntregablesController;

Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/nombreEmpresa/{id}', [EmpresaController::class, 'getNombreEmpresa']);

Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);


// ----Visualizar Sprint-----
// Devuelve todos los datos del Sprint por id
Route::get('/getSprintPorId', [SprintController::class, 'getSprintPorId']);
// Devuelve una lista de Sprints por idEmpresa
Route::get('/getListaSprintsPorIdEmpresa', [SprintController::class, 'getListaSprintsPorIdEmpresa']);
// ----añadir revision-----
// cambia la revision como valida
Route::put('/validar', [PlanificacionController::class, 'validar']);

// ----publicar planificacion-----
// publica una planificacion
Route::put('/publicarPlanificacion', [PlanificacionController::class, 'publicar']);

// añade los comentarios y la nota
Route::post('/addRevision', [PlanificacionController::class, 'addRevision']);

// ----Listar Empresas-----
// obtiene una lista de todas las empresas
Route::get('/empresas/', [EmpresaController::class, 'getListaEmpresas']);

// obtiene una lista de todas las empresas que aun no fueron validadas
Route::get('/planificacionesSinValidar', [PlanificacionController::class, 'planificacionesSinValidar']);
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
Route::get('/empresas/{idEmpresa}/calificaciones', [EmpresaController::class, 'getCalificacionesEmpresa']);
Route::get('/empresas/notaSprint', [NotaSprintController::class, 'notaSprint']);
Route::get('/empresas/notasSprint/{idEmpresa}', [NotaSprintController::class, 'notasSprint']);

/**
 * TODOS LOS POST VAN 
 *
 */
//Para crear la planificacion o modificarla
Route::post('/planificacion/guardar2', [PlanificacionController::class, 'crearPlanificacion']);

Route::post('/planificacion/guardar', [PlanificacionController::class, 'modificarPlanificacion']);
Route::post('/planificacion/guardarSprints', [SprintController::class, 'modificarSprint']);
Route::post('/planificacion/guardarEntregables', [EntregablesController::class, 'guardarEntregables']);
//tests
//---Modificar planificacion---
//tests para ver lista de sprints y sprints por ID
Route::get('/testGetSprint',[SprintController::class, 'testSprintPorId']);

Route::get('/testGetListaSprints',[SprintController::class, 'testListaSprintsPorIdEmpresa']);
//tests para ver si los sprints insertados se guardan
Route::get('/testGuardar', [SprintController::class, 'testModificarSprint']);
//tests para  ver si la planificacion se actualiza o se crea si no existe
Route::get('/testGuardarPlanificacion', [PlanificacionController::class, 'testModificarPlanificacion']);
Route::get('/testGuardarEntregables', [EntregablesController::class, 'testGuardarEntregables']);
// Ruta para crear una tarea
Route::post('/tarea/crear', [TareaController::class, 'store']);
//Para asignar grupos
Route::post('/asignarEstudiante', [EstudianteController::class, 'asignarEstudianteAGrupo']);
Route::post('/grupo/estudiante/barraBusqueda', [GrupoController::class, 'barraBusquedaEstudiante']);
Route::post('/grupo/docente/1/barraBusqueda', [GrupoController::class, 'barraBusquedaEmpresas']);

Route::post('/estudiante/crearEmpresa', [EstudiantesEmpresasController::class, 'crearEmpresa']);

Route::post('/docente/darDeBaja', [GrupoController::class, 'darDeBaja']);
// Ruta para modificar una tarea con sus archivos
Route::post('/tarea/{idTarea}/guardar', [TareaController::class, 'update']);

