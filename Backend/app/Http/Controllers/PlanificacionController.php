<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request; // Asegúrate de importar la clase Request
use Illuminate\Http\JsonResponse; // Para las respuestas JSON
use App\Models\Planificacion; // Importa tu modelo Planificacion
use App\Models\Sprint; // Importa tu modelo Sprint
use App\Models\Empresa; // Asegúrate de importar el modelo Empresa
use Exception;

class PlanificacionController extends Controller
{
    public function planificacionAceptadas(): JsonResponse
    {
        // Obtener todas las empresas
        $empresas = Empresa::all();

        // Inicializar un array para almacenar los datos de planificación
        $data = [];

        foreach ($empresas as $empresa) {
            // Obtener la planificación de la empresa
            $planificacion = Planificacion::with('sprints')
                ->orderBy('fechaEntrega', 'desc')
                ->where('idEmpresa', $empresa->idEmpresa)
                ->first();

            // Verificar si la planificación existe y está aceptada
            if ($planificacion && $planificacion->aceptada) {
                // Si la planificación existe y está aceptada, devolver el número de sprints
                $data[] = [
                    'idPlanificacion' => $planificacion->idPlanificacion,
                    'nombreEmpresa' => $empresa->nombreEmpresa,
                    'nombreLargo' => $empresa->nombreLargo,
                    'idEmpresa' => $planificacion->idEmpresa,
                    'aceptada' => $planificacion->aceptada,
                    'numeroSprints' => $planificacion->sprints->count(), // Contar el número de sprints
                ];
            }
        }

        // Retornar la respuesta JSON con los datos de empresas aceptadas
        return response()->json($data);
    }
    public function planificacionRechazadas(): JsonResponse
    {
        // Obtener todas las empresas
        $empresas = Empresa::all();

        // Inicializar un array para almacenar los datos de planificación
        $data = [];

        foreach ($empresas as $empresa) {
            // Obtener la planificación de la empresa
            $planificacion = Planificacion::with('sprints')
                ->orderBy('fechaEntrega', 'desc')
                ->where('idEmpresa', $empresa->idEmpresa)
                ->first();

            // Verificar si la planificación existe y está aceptada
            if ($planificacion && !$planificacion->aceptada) {
                // Si la planificación existe y está aceptada, devolver el número de sprints
                $data[] = [
                    'idPlanificacion' => $planificacion->idPlanificacion,
                    'nombreEmpresa' => $empresa->nombreEmpresa,
                    'nombreLargo' => $empresa->nombreLargo,
                    'idEmpresa' => $planificacion->idEmpresa,
                    'aceptada' => $planificacion->aceptada,
                    'numeroSprints' => $planificacion->sprints->count(), // Contar el número de sprints
                ];
            }
        }

        // Retornar la respuesta JSON con los datos de empresas aceptadas
        return response()->json($data);
    }
    public function show($idEmpresa): JsonResponse
    {
        // Verificar si la empresa existe
        $empresa = Empresa::find($idEmpresa);

        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Obtener la planificación de la empresa si existe
        $planificacion = Planificacion::with(['empresa', 'sprints'])
            ->orderBy('fechaEntrega', 'desc')
            ->where('idEmpresa', $idEmpresa)
            ->first();

        if (!$planificacion) {
            // Si no hay planificación, devolver datos por defecto
            return response()->json([
                'idEmpresa' => $empresa->idEmpresa,
                'idPlanificacion' => -1,
                'aceptada' => 0,
                'notaPlanificacion' => 0,
                'comentarioDocente' => 'Comentario Docente',
                'sprints' => [
                    ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables' => 'esto es un ejemplo'],
                    ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables' => 'esto es un ejemplo'],
                    ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables' => 'esto es un ejemplo'],
                ],  // Array de sprints con 3 filas vacías  
            ], 200);  // Código 200 ya que la empresa existe
        }


        // Si la planificación existe, devolver los datos correspondientes
        $data = [
            'idPlanificacion' => $planificacion->idPlanificacion,
            'idEmpresa' => $planificacion->idEmpresa,
            'aceptada' => $planificacion->aceptada,
            'fechaEntrega' => $planificacion->fechaEntrega,
            'notaPlanificacion' => $planificacion->notaplanificacion,
            'comentarioDocente' => $planificacion->comentariodocente,
            'sprints' => $planificacion->sprints->map(function ($sprint) {
                return [
                    'idSprint' => $sprint->idSprint,
                    'fechaIni' => $sprint->fechaIni,
                    'fechaFin' => $sprint->fechaFin,
                    'cobro' => $sprint->cobro,
                    'fechaEntrega' => $sprint->fechaEntrega,
                    'entregables' => $sprint->entregables,
                    'notasprint' => $sprint->notasprint,
                    'comentariodocente' => $sprint->comentariodocente
                ];
            })->toArray()
        ];

        // Retornar la respuesta JSON
        return response()->json($data);
    }
    public function notaComentario($idPlanificacion): JsonResponse
    {
        $planificacion = Planificacion::find($idPlanificacion);

        if (!$planificacion) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        }


        $data = [

            'notaPlanificacion' => $planificacion->notaPlanificacion ?? null,
            'comentarioDocente' => $planificacion->comentarioDocente ?? null,
            'fechaEntrega' => $planificacion->fechaEntrega
        ];

        // Retornar la respuesta JSON
        return response()->json($data);
    }



    public function validar(Request $request)
    {
        $validatedData = $request->validate([
            'idEmpresa' => 'required|integer',
        ]);

        $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();

        if ($planificacion === null) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        } else {
            $planificacion->aceptada = 1;
            $planificacion->save();
            return response()->json([
                'message' => 'Planificación aceptada con éxito',
                'planificacion' => $planificacion
            ]);
        }
    }




    public function crearPlanificacion(Request $request): JsonResponse
    {
        // Validar los datos de entrada
        $request->validate([
            'aceptada' => 'required|boolean',
            'comentarioDocente' => 'required|string',
            'fechaEntrega' => 'required|date_format:Y-m-d H:i:s',
            'idEmpresa' => 'required|integer|exists:empresa,idEmpresa',
            'notaPlanificacion' => 'required|integer',
            'sprints' => 'required|array',
            'sprints.*.fechaIni' => 'required|date',
            'sprints.*.fechaFin' => 'required|date|after_or_equal:sprints.*.fechaIni',
            'sprints.*.cobro' => 'required|integer',
            'sprints.*.fechaEntrega' => 'required|date',
            'sprints.*.entregables' => 'required|string',
        ], [
            'sprints.*.fechaFin.after_or_equal' => 'La fecha de fin debe ser después o igual a la fecha de inicio.',
        ]);

        try {
            // Comenzar la transacción
            DB::beginTransaction();

            // Crear la planificación
            $planificacion = Planificacion::create([
                'aceptada' => $request->aceptada,
                'comentarioDocente' => $request->comentarioDocente,
                'fechaEntrega' => $request->fechaEntrega,
                'idEmpresa' => $request->idEmpresa,
                'notaPlanificacion' => $request->notaPlanificacion,
            ]);

            // Insertar los sprints
            foreach ($request->sprints as $sprintData) {
                Sprint::create([
                    'idPlanificacion' => $planificacion->idPlanificacion,
                    'notasprint' => 0, // Cambia esto si tienes un valor específico
                    'comentariodocente' => $request->comentarioDocente,
                    'entregables' => $sprintData['entregables'],
                    'fechaEntrega' => $sprintData['fechaEntrega'],
                    'cobro' => $sprintData['cobro'],
                    'fechaFin' => $sprintData['fechaFin'],
                    'fechaIni' => $sprintData['fechaIni'],
                ]);
            }

            // Confirmar la transacción
            DB::commit();

            // Retornar una respuesta exitosa
            return response()->json([
                'message' => 'Planificación y sprints creados exitosamente',
                'idPlanificacion' => $planificacion->idPlanificacion,
                'sprints' => $planificacion->sprints,
            ], 200);
        } catch (\Exception $e) {
            // Revertir la transacción en caso de error
            DB::rollBack();

            // Retornar un mensaje de error
            return response()->json([
                'message' => 'Error al crear la planificación: ' . $e->getMessage(),
            ], 500);
        }
    }
}
