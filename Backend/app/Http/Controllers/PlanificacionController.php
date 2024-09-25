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
                    'idPlanificacion' => -1,
                    'aceptada' => 0,
                    'notaPlanificacion' => 0,
                    'comentarioDocente' => 'Comentario Docente',
                    'sprints' => [
                        ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables'=>'esto es un ejemplo'],
                        ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables'=>'esto es un ejemplo'],
                        ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables'=>'esto es un ejemplo'],
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

    public function guardarPlanificacion(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'idEmpresa' => 'required|integer',
                'fechaEntrega' => 'required|date',
                'comentarioDocente' => 'required|string',
                'notaPlanificacion' => 'required|integer',
                'aceptada' => 'required|boolean',
                'sprints' => 'required|array|min:1',
                'sprints.*.fechaIni' => 'required|date',
                'sprints.*.fechaFin' => 'required|date',
                'sprints.*.cobro' => 'required|integer',
                'sprints.*.fechaEntrega' => 'required|date',
                'sprints.*.entregables' => 'nullable|string',
                'sprints.*.notasprint' => 'required|integer',
                'sprints.*.comentarioDocente' => 'nullable|string',
            ]);
    
            $idEmpresa = $data['idEmpresa'];
    
            // Intentamos encontrar una planificación existente para esta empresa
            $planificacionExistente = Planificacion::where('idEmpresa', $idEmpresa)->lastest();
    
            if ($planificacionExistente) {
                // Si existe una planificación, se sobrescribirá creando una nueva
                $nuevaPlanificacion = new Planificacion();
                $nuevaPlanificacion->idEmpresa = $idEmpresa;
                $nuevaPlanificacion->fechaEntrega = $data['fechaEntrega'];
                $nuevaPlanificacion->comentarioDocente = $data['comentarioDocente'];
                $nuevaPlanificacion->notaPlanificacion = $data['notaPlanificacion'];
                $nuevaPlanificacion->aceptada = $data['aceptada'];
                $nuevaPlanificacion->save(); // Guardamos la nueva planificación
    
                // Eliminamos los sprints antiguos asociados a la planificación existente
                Sprint::where('idPlanificacion', $planificacionExistente->idPlanificacion)->delete();
    
                // Creamos los nuevos sprints
                foreach ($data['sprints'] as $sprintData) {
                    $nuevoSprint = new Sprint();
                    $nuevoSprint->idPlanificacion = $nuevaPlanificacion->idPlanificacion;
                    $nuevoSprint->fechaIni = $sprintData['fechaIni'];
                    $nuevoSprint->fechaFin = $sprintData['fechaFin'];
                    $nuevoSprint->cobro = $sprintData['cobro'];
                    $nuevoSprint->fechaEntrega = $sprintData['fechaEntrega'];
                    $nuevoSprint->entregables = $sprintData['entregables'];
                    $nuevoSprint->notasprint = $sprintData['notasprint'];
                    $nuevoSprint->comentarioDocente = $sprintData['comentarioDocente'];
                    $nuevoSprint->save();
                }
    
                return response()->json(['message' => 'Planificación actualizada y sobrescrita con éxito'], 200);
            } else {
                // Si no existe una planificación, se crea una nueva
                $nuevaPlanificacion = Planificacion::create([
                    'idEmpresa' => $idEmpresa,
                    'fechaEntrega' => $data['fechaEntrega'],
                    'comentarioDocente' => $data['comentarioDocente'],
                    'notaPlanificacion' => $data['notaPlanificacion'],
                    'aceptada' => $data['aceptada'],
                ]);
    
                // Creamos los nuevos sprints
                foreach ($data['sprints'] as $sprintData) {
                    Sprint::create([
                        'idPlanificacion' => $nuevaPlanificacion->idPlanificacion,
                        'fechaIni' => $sprintData['fechaIni'],
                        'fechaFin' => $sprintData['fechaFin'],
                        'cobro' => $sprintData['cobro'],
                        'fechaEntrega' => $sprintData['fechaEntrega'],
                        'entregables' => $sprintData['entregables'],
                        'notasprint' => $sprintData['notasprint'],
                        'comentarioDocente' => $sprintData['comentarioDocente'],
                    ]);
                }
    
    
                return response()->json(['message' => 'Planificación creada con éxito'], 201);
            }
        } catch (\Exception $e) {
            \Log::error('Error al guardar la planificación: '.$e->getMessage());
            return response()->json(['message' => 'Error al guardar la planificación'], 500);
        }
        
        
    }
    
    
}
