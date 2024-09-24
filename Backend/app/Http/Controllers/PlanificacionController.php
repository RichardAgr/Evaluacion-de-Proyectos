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


    public function gestionarPlanificacion(Request $request): JsonResponse
    {
        // Validar la solicitud
        $validatedData = $request->validate([
            'idEmpresa' => 'required|integer',
            'idPlanificacion' => 'required|integer',
            'sprintsAntiguos' => 'required|array',
            'sprintsNuevos' => 'required|array',
        ]);

        try {
            \Log::info('Creando planificación', ['data' => $validatedData]);
            // Verificar si es necesario crear una nueva planificación o modificar una existente
            if ($validatedData['idPlanificacion'] == -1) {
                \Log::info('Creando planificación', ['data' => $validatedData]);

                // Crear nueva planificación
                $planificacion = Planificacion::create([
                    'idEmpresa' => $validatedData['idEmpresa'],
                    // Puedes agregar más campos si tu tabla Planificacion tiene más atributos
                ]);
                \Log::info('Creando planificación', ['data' => $validatedData]);

                // Crear los nuevos sprints
                foreach ($validatedData['sprintsNuevos'] as $nuevoSprint) {
                    Sprint::create([
                        'idPlanificacion' => $planificacion->idPlanificacion,
                        'fechaIni' => $nuevoSprint['fechaIni'],
                        'fechaFin' => $nuevoSprint['fechaFin'],
                        'cobro' => $nuevoSprint['cobro'],
                        'fechaEntrega' => $nuevoSprint['fechaEntrega'],
                        'entragables' => $nuevoSprint['entragables'],
                        'notasprint' => $nuevoSprint['notasprint'],
                        'comentariodocente' => $nuevoSprint['comentariodocente'],
                    ]);
                }
                \Log::info('Creando planificación', ['data' => $validatedData]);

                return response()->json(['message' => 'Planificación y sprints creados exitosamente'], 201);

            } else {
                \Log::info('Creando planificación', ['data' => $validatedData]);

                // Modificar la planificación existente
                $planificacion = Planificacion::findOrFail($validatedData['idPlanificacion']);
                \Log::info('Creando planificación', ['data' => $validatedData]);

                // Actualizar sprints antiguos
                foreach ($validatedData['sprintsAntiguos'] as $sprintAntiguo) {
                    $sprint = Sprint::where('idSprint', $sprintAntiguo['idSprint'])
                                    ->where('idPlanificacion', $planificacion->idPlanificacion)
                                    ->first();

                    if ($sprint) {
                        // Si el sprint existe, actualizarlo
                        $sprint->update([
                            'fechaIni' => $sprintAntiguo['fechaIni'] ?? $sprint->fechaIni,
                            'fechaFin' => $sprintAntiguo['fechaFin'] ?? $sprint->fechaFin,
                            'cobro' => $sprintAntiguo['cobro'] ?? $sprint->cobro,
                            'fechaEntrega' => $sprintAntiguo['fechaEntrega'] ?? $sprint->fechaEntrega,
                            'entragables' => $sprintAntiguo['entragables'] ?? $sprint->entragables,
                            'notasprint' => $sprintAntiguo['notasprint'] ?? $sprint->notasprint,
                            'comentariodocente' => $sprintAntiguo['comentariodocente'] ?? $sprint->comentariodocente,
                        ]);
                    }
                }
                \Log::info('Creando planificación', ['data' => $validatedData]);

                // Crear nuevos sprints
                foreach ($validatedData['sprintsNuevos'] as $nuevoSprint) {
                    if ($nuevoSprint['idSprint'] == -1) {
                        // Crear nuevo sprint si el idSprint es -1
                        Sprint::create([
                            'idPlanificacion' => $planificacion->idPlanificacion,
                            'fechaIni' => $nuevoSprint['fechaIni'],
                            'fechaFin' => $nuevoSprint['fechaFin'],
                            'cobro' => $nuevoSprint['cobro'],
                            'fechaEntrega' => $nuevoSprint['fechaEntrega'],
                            'entragables' => $nuevoSprint['entragables'],
                            'notasprint' => $nuevoSprint['notasprint'],
                            'comentariodocente' => $nuevoSprint['comentariodocente'],
                        ]);
                    }
                }
                \Log::info('Creando planificación', ['data' => $validatedData]);

                // Eliminar sprints que no estén en la lista de sprints antiguos
                $idsSprintsAntiguos = array_column($validatedData['sprintsAntiguos'], 'idSprint');
                Sprint::where('idPlanificacion', $planificacion->idPlanificacion)
                    ->whereNotIn('idSprint', $idsSprintsAntiguos)
                    ->delete();

                return response()->json(['message' => 'Planificación y sprints actualizados exitosamente'], 200);
            }
        } catch (\Exception $e) {
            \Log::error('Error en gestionarPlanificacion: ' . $e->getMessage(), [
                'request' => $request->all(), // Guarda la solicitud que causó el error
                'stack' => $e->getTraceAsString(), // Guarda la traza del error
            ]);
            return response()->json(['message' => 'Error al gestionar la planificación', 'error' => $e->getMessage()], 500);
        }
        
    }
}
