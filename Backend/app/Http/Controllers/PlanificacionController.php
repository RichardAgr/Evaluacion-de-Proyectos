<?php
namespace App\Http\Controllers;

use App\Models\Planificacion;
use App\Models\Empresa; // Asegúrate de tener importado el modelo Empresa
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class PlanificacionController extends Controller
{
    public function show($idEmpresa): JsonResponse
    {
        // Verificar si la empresa existe
        $empresa = Empresa::find($idEmpresa);

        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Obtener la planificación de la empresa si existe
        $planificacion = Planificacion::with(['empresa', 'sprints'])
            ->where('idEmpresa', $idEmpresa)
            ->first();

            if (!$planificacion) {
                // Si no hay planificación, devolver datos por defecto
                return response()->json([
                    'idEmpresa' => $empresa->idEmpresa,
                    'aceptada' => 0,  // Valor predeterminado
                    'sprints' => [
                        ['idSprint' => null, 'fechaIni' => null, 'fechaFin' => null, 'cobro' => null, 'fechaEntrega' => null],
                        ['idSprint' => null, 'fechaIni' => null, 'fechaFin' => null, 'cobro' => null, 'fechaEntrega' => null],
                        ['idSprint' => null, 'fechaIni' => null, 'fechaFin' => null, 'cobro' => null, 'fechaEntrega' => null],
                    ],  // Array de sprints con 3 filas vacías
                ], 200);  // Código 200 ya que la empresa existe
            }
            

        // Si la planificación existe, devolver los datos correspondientes
        $data = [
            'idPlanificacion' => $planificacion->idPlanificacion,
            'idEmpresa' => $planificacion->idEmpresa,
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
