<?php
namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request; // Asegúrate de importar la clase Request
use Illuminate\Http\JsonResponse; // Para las respuestas JSON
use App\Models\Planificacion; // Importa tu modelo Planificacion
use App\Models\Sprint; // Importa tu modelo Sprint
use App\Models\Empresa; // Asegúrate de importar el modelo Empresa

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
                    'comentariodocente' => $sprint -> comentariodocente
                ];
            })->toArray()
        ];

        // Retornar la respuesta JSON
        return response()->json($data);
    }
    public function notaComentario($idPlanificacion): JsonResponse{
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
    

    public function showP($idPlanificacion): JsonResponse
    {
        // Buscar la planificación por ID
        $planificacion = Planificacion::find($idPlanificacion);

        // Verificar si la planificación existe
        if (!$planificacion) {
            return response()->json(['message' => 'Planificación no encontrada'], 404);
        }

        // Devolver la planificación encontrada
        return response()->json(['planificacion' => $planificacion], 200);
    }


    public function agregarSprint(Request $request, $idPlanificacion): JsonResponse
    {
        // Validar la solicitud
        $validatedData = $request->validate([
            'fechaIni' => 'required|date',
            'fechaFin' => 'required|date',
            'cobro' => 'nullable|integer',
            'notasprint' => 'nullable|integer',
            'comentariodocente' => 'nullable|string',
        ]);

        // Verificar si la planificación existe
        $planificacion = Planificacion::findOrFail($idPlanificacion);

        // Crear el nuevo sprint
        $sprint = Sprint::create([
            'idPlanificacion' => $planificacion->idPlanificacion,
            'fechaIni' => $validatedData['fechaIni'],
            'fechaFin' => $validatedData['fechaFin'],
            'cobro' => $validatedData['cobro'],
            'notasprint' => $validatedData['notasprint'],
            'comentariodocente' => $validatedData['comentariodocente'],
        ]);

        return response()->json(['message' => 'Sprint agregado exitosamente', 'sprint' => $sprint], 201);
    }

    public function modificarSprint(Request $request, $idPlanificacion, $idSprint): JsonResponse
    {
        // Validar la solicitud
        $validatedData = $request->validate([
            'fechaIni' => 'required|date',
            'fechaFin' => 'required|date|after:fechaIni',
            'cobro' => 'nullable|integer',
            'notasprint' => 'nullable|integer',
            'comentariodocente' => 'nullable|string',
        ]);

        try {
            // Buscar el sprint que pertenezca a la planificación correspondiente
            $sprint = Sprint::where('idSprint', $idSprint)
                            ->where('idPlanificacion', $idPlanificacion)
                            ->firstOrFail();
            
            // Actualizar el sprint
            $sprint->update($validatedData);

        return response()->json(['message' => 'Sprint modificado exitosamente', 'sprint' => $sprint], 200);
    } catch (ModelNotFoundException $e) {
        return response()->json(['message' => 'Sprint no encontrado o no pertenece a la planificación con id ' . $idPlanificacion], 404);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al modificar el sprint', 'error' => $e->getMessage()], 500);
    }
}
}
