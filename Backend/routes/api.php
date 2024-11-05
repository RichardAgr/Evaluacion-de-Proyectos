<?php
/*
esto es un prueba de subir al git 2
*/

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Estudiante\TareaController;
use App\Http\Controllers\Docente\GrupoController;
use App\Http\Controllers\Estudiante\EstudianteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Empresa\PlanificacionController;
use App\Http\Controllers\Empresa\DocenteController;
use App\Http\Controllers\Empresa\SprintController;
use App\Http\Controllers\Estudiante\EstudiantesEmpresasController;
use App\Http\Controllers\Empresa\NotaSprintController;
use App\Http\Controllers\Empresa\EntregablesController;
use App\Http\Controllers\Empresa\EmpresaController;

use App\Http\Controllers\joaquinController;

//============================= GET EMPRESA ================================


Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/nombreEmpresa/{id}', [EmpresaController::class, 'getNombreEmpresa']);
// ----Listar Empresas-----
// ---obtiene una lista de todas las empresas
Route::get('/empresas/listaEmpresas', [EmpresaController::class, 'getListaEmpresas']);
//---Recibe todos los estudiantes del grupo del estudiante logeado
Route::get('/empresas/obtenerEstudiantes',[EstudianteController::class, 'obtenerEstudiantesPorGrupo']);
Route::get('/empresas/{idEmpresa}/calificaciones', [EmpresaController::class, 'getCalificacionesEmpresa']);
//---Recibe la nota del sprint seleccionado
Route::get('/empresas/notaSprint/{idEmpresa}/{semana}', [NotaSprintController::class, 'notaSprint']);
//---Recibe las notas de todo los sprints
Route::get('/empresas/notasSprint/{idEmpresa}', [NotaSprintController::class, 'notasSprint']);

//============================= GET ESTUDIANTE =============================
//---Recupera la tarea
Route::get('/tarea/{idTarea}', [TareaController::class, 'obtenerTarea']);
Route::get('/estudiante/gruposDocente', [GrupoController::class, 'obtenerTodosLosGrupos']);
Route::get('/estudiante/descripcionGrupo/{idGrupo}', [GrupoController::class, 'getDescripcion']);
Route::get('/estudiante/sprint/semana/{idSprint}',[SprintController::class, 'sprintsSemanas']);

//============================= GET DOCENTE ================================
//---Recibe la lista de estudiantes de un grupo especifico del docente activo
Route::get('/docente/listaEstudiantes', [GrupoController::class, 'obtenerEstudiantesPorGrupo']);
//---Recibe las empresas del grupo del docente y del docente activo
Route::get('/docente/obtenerEmpresasPorGrupoYDocente',[GrupoController::class, 'obtenerEmpresasPorGrupoYDocente']);
//---Recibe las tareas de un estudiante {Puuede no funcionar}
Route::get('/docente/obtenerTareas', [NotaSprintController::class, 'obtenerTareaYEstudiante']);
//-- sprints con toda su informacion y los entragables
Route::get('/empresa/{idEmpresa}/sprintsEntregables', [EmpresaController::class, 'getSprintsEntregables']);


//============================= PLANIFICACION ==============================

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

// ===================== NO SE DONDE IRIA ESTO  {Checkar los creadores}===============
//Route::get('/docente/empresa/{idEmpresa}', [PlanificacionController::class, 'obtenerDocentePorEmpresa']);
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

// ==================================   RUTAS POST =================================

// ==================================   POST PLANIFICACION    ==================================

// ---Cambia la revision como valida---
Route::put('/planificacion/validar', [PlanificacionController::class, 'validar']);
Route::put('/planificacion/publicarPlanificacion', [PlanificacionController::class, 'publicar']);
// ---añade los comentarios y la nota
Route::post('/planificacion/addRevision', [PlanificacionController::class, 'addRevision']);


// ==================================   POST ESTUDIANTE     =====================================
// ---Ruta para crear una tarea
Route::post('/tarea/crear', [TareaController::class, 'store']);
// ---Para asignar grupos
Route::post('/estudiante/asignarEstudiante', [EstudianteController::class, 'asignarEstudianteAGrupo']);
// ---Crea la empresa
Route::post('/estudiante/crearEmpresa', [EstudiantesEmpresasController::class, 'crearEmpresa']);

// ===================================   POST EMPRESA       =======================================

// ---Para crear la planificacion o modificarla
Route::post('/planificacion/guardar2', [PlanificacionController::class, 'crearPlanificacion']);
Route::post('/planificacion/guardar', [PlanificacionController::class, 'modificarPlanificacion']);
Route::post('/planificacion/guardarSprints', [SprintController::class, 'modificarSprint']);
Route::post('/planificacion/guardarEntregables', [EntregablesController::class, 'guardarEntregables']);

// ===================================   POST DOCENTE       =======================================

// ---barras de busqueda
Route::post('/docente/listaEstudiante/barraBusqueda', [GrupoController::class, 'barraBusquedaEstudiante']);
Route::post('/docente/listaEmpresa/barraBusqueda', [GrupoController::class, 'barraBusquedaEmpresas']);
Route::post('/docente/darDeBaja', [GrupoController::class, 'darDeBaja']);

// ---Ruta para modificar una tarea con sus archivos
Route::post('/tarea/{idTarea}/guardar', [TareaController::class, 'update']);

// ---Realizar evaluacion semanal
Route::post('/docente/evaluacion', [NotaSprintController::class, 'realizarEvaluacionSemana']);



Route::get('/empresa/{idEmpresa}/sprint/{idSprint}/tareas', [SprintController::class, 'getSprintEvaluar']);
Route::get('/empresa/{idEmpresa}/sprint/{idSprint}/semana/{idSemana}/tareas', [TareaController::class, 'getTareasSemana']);
Route::get('/empresa/{idEmpresa}/sprintsEntregables', [EmpresaController::class, 'getSprintsEntregables']);



Route::put('/empresa/{idEmpresa}/sprint/{idSprint}/semana/{idSemana}/tareas', [TareaController::class, 'updateTareasSemana']);
Route::post('/empresa/{idEmpresa}/sprint/{idSprint}/evaluacion', [SprintController::class, 'updateSprintEvaluar']);

// ----post docente nota sprint
Route::post('/sprint/{idSprint}/actualizar', [SprintController::class, 'actualizarNotaComentario']);


// ============================      SESIONES DOCENTE     ======================================

Route::get('/session/active/docente', [AuthController::class, 'isSessionActiveDocente']);
Route::post('/session/logeado/docente', [AuthController::class, 'loginConIdDocente']);
Route::post('/session/logout/docente', [AuthController::class, 'logoutDocente']);

// ============================      SESIONES ESTUDIANTE  ====================================

Route::get('/session/active/estudiante', [AuthController::class, 'isSessionActiveEstudiante']);
Route::post('/session/logeado/estudiante', [AuthController::class, 'loginConIdEstudiante']);
Route::post('/session/logout/estudiante', [AuthController::class, 'logoutEstudiante']);





// ============================  Funciones Joaquin  ====================================

Route::get('estudiante/getEstudiante/{id}', [joaquinController::class, 'getEstudiante']);
Route::get('prueba/notaSprintV2/{idEmpresa}/{semana}', [joaquinController::class, 'notaSprintV2']);
Route::post('/crearGrupoEmpresa/paso1',[joaquinController::class, 'crearEmpresa']);
