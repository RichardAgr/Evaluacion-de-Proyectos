<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PlanificacionController;

Route::get('/', function () {
    return view('welcome');
});







Route::get('/empresa/{id}', [EmpresaController::class, 'getEmpresaData']);

Route::get('/planificacion/{idEmpresa}', [PlanificacionController::class, 'show']);
