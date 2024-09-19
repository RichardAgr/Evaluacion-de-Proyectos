<?php
namespace App\Http\Controllers;

use App\Models\Planificacion;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class PlanificacionController extends Controller
{
    public function show($idEmpresa): JsonResponse
    {
        
        $planificacion = Planificacion::with(['empresa', 'sprints'])
            ->where('idEmpresa', $idEmpresa)
            ->first();
            
        if (!$planificacion) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        }

 
        $data = [
            'idPlanificacion' => $planificacion->idPlanificacion,
            'idEmpresa' => $planificacion->idEmpresa,
            'empresa' => [
                'nombreEmpresa' => $planificacion->empresa->nombreEmpresa ?? null,
                'nombreLargo' => $planificacion->empresa->nombreLargo ?? null,
            ],
            'aceptada' => $planificacion->aceptada,
            'fechaEntrega' => $planificacion->fechaEntrega,
            'sprints' => $planificacion->sprints->map(function ($sprint) {
                return [
                    'idSprint' => $sprint->idSprint,
                    'fechaIni' => $sprint->fechaIni,
                    'fechaFin' => $sprint->fechaFin,
                    'cobro' => $sprint->cobro,
                    'fechaEntrega' => $sprint->fechaEntrega
                ];
            })->toArray()
        ];

        // Retornar la respuesta JSON
        return response()->json($data);
    }
}
