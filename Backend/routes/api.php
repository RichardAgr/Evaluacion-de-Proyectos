<?php
/*
esto es un prueba de subir al git 2
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;


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

Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);
Route::get('/planificacion/notaComentario/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificacionAceptadas}', [PlanificacionController::class, 'planificacionAceptadas']);
Route::get('/planificacionRechazadas}', [PlanificacionController::class, 'planificacionRechazadas']);
Route::get('/notas1/{idPlanificacion}', [PlanificacionController::class, 'notaComentario']);
Route::get('/planificaciones/{idPlanificacion}/sprints', [PlanificacionController::class, 'showP']);
Route::post('/planificacion/gestionar', [PlanificacionController::class, 'gestionarPlanificacion']);

