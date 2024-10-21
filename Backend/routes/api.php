<?php
/*
esto es un prueba de subir al git 2
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\SprintController;

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

Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);
Route::get('/nombreEmpresa/{id}', [EmpresaController::class, 'getNombreEmpresa']);

Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);

// ----añadir revision-----
// cambia la revision como valida
Route::put('/validar', [PlanificacionController::class, 'validar']);

// añade los comentarios y la nota
Route::post('/addRevision', [PlanificacionController::class, 'addRevision']);

// ----Listar Empresas-----
// obtiene una lista de todas las empresas
Route::get('/empresas/', [EmpresaController::class, 'getListaEmpresas']);

// obtiene una lista de todas las empresas que aun no fueron validadas
Route::get('/planificacionesSinValidar', [PlanificacionController::class, 'planificacionesSinValidar']);

//jhon
Route::get('/planificacion/notaComentario/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificacionAceptadas', [PlanificacionController::class, 'planificacionAceptadas']);

//Para crear la planificacion o modificarla
Route::post('/planificacion/guardar2', [PlanificacionController::class, 'crearPlanificacion']);

Route::post('/planificacion/guardar', [PlanificacionController::class, 'modificarPlanificacion']);
Route::post('/planificacion/guardarSprints', [SprintController::class, 'modificarSprint']);

//tests
//---Modificar planificacion---
//tests para ver si los sprints insertados se guardan
Route::get('/testGuardar', [SprintController::class, 'testModificarSprint']);
//tests para  ver si la planificacion se actualiza o se crea si no existe
Route::get('/testGuardarPlanificacion', [PlanificacionController::class, 'testModificarPlanificacion']);