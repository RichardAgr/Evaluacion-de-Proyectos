<?php

namespace App\Http\Controllers\Empresa;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request; // Asegúrate de importar la clase Request
use Illuminate\Http\JsonResponse; // Para las respuestas JSON
use App\Models\Planificacion; // Importa tu modelo Planificacion
use App\Models\Sprint; // Importa tu modelo Sprint
use App\Models\Empresa; // Asegúrate de importar el modelo Empresa
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
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
                    'id' => $planificacion->idPlanificacion,
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
    public function planificacionesSinValidar(): JsonResponse
    {
        // Obtener todas las empresas, en el futuro debera filtrar las empresas por docente
        $empresas = Empresa::all();
        $data = [];
        foreach ($empresas as $empresa) {
            // Obtener la planificación de la empresa
            $planificacion = Planificacion::where('idEmpresa', $empresa->idEmpresa)
                ->first();

            // Verificar si la planificación existe y si fue rechazada
            if ($planificacion && $planificacion->aceptada === 0 && $planificacion->publicada=== 1) {
                // Si la planificación existe y fue rechazada, guarda sus datos
                $data[] = [
                    'id' => $planificacion->idPlanificacion,
                    'nombreEmpresa' => $empresa->nombreEmpresa,
                    'nombreLargo' => $empresa->nombreLargo,
                    'idEmpresa' => $planificacion->idEmpresa,
                    'aceptada' => $planificacion->aceptada,
                    'numeroSprints' => $planificacion->sprints->count(), // Contar el número de sprints, innecesario
                ];
            }
        }

        // Retornar la respuesta JSON con los datos de empresas aceptadas
        return response()->json($data);
    }
    public function planificacionesParaModificar(): JsonResponse
    {
        // Obtener todas las empresas, en el futuro deberá filtrar las empresas por docente
        $empresas = Empresa::all();
        $data = [];
        foreach ($empresas as $empresa) {
            // Obtener la planificación de la empresa
            $planificacion = Planificacion::where('idEmpresa', $empresa->idEmpresa)
                ->first();
    
            if ($planificacion) {
                // Si la planificación existe y fue rechazada o no publicada, guarda sus datos
                if ($planificacion->publicada === 0 && $planificacion->aceptada !== 1) {
                    $data[] = [
                        'id' => $empresa->idEmpresa,
                        'nombreEmpresa' => $empresa->nombreEmpresa,
                        'nombreLargo' => $empresa->nombreLargo,
                        'idEmpresa' => $planificacion->idEmpresa,
                        'aceptada' => $planificacion->aceptada,
                        'numeroSprints' => $planificacion->sprints->count(),
                        'tienePlanificacion' => true,
                    ];
                }
            } else {
                // Si la empresa no tiene planificación, también la incluimos
                $data[] = [
                    'id' => $empresa->idEmpresa,
                    'nombreEmpresa' => $empresa->nombreEmpresa,
                    'nombreLargo' => $empresa->nombreLargo,
                    'idEmpresa' => $empresa->idEmpresa,
                    'aceptada' => null,
                    'numeroSprints' => 0,
                    'tienePlanificacion' => false,
                ];
            }
        }
    
        // Retornar la respuesta JSON con los datos de empresas
        return response()->json($data);
    }
    public function planificacionesSinPublicar(): JsonResponse
    {
        // Obtener todas las empresas, en el futuro debera filtrar las empresas por docente
        $empresas = Empresa::all();
        $data = [];
        foreach ($empresas as $empresa) {
            // Obtener la planificación de la empresa
            $planificacion = Planificacion::where('idEmpresa', $empresa->idEmpresa)
                ->first();

            // Verificar si la planificación existe y si fue rechazada
            if ($planificacion && $planificacion->publicada === 0 && $planificacion->aceptada !== 1) {
                // Si la planificación existe y fue rechazada, guarda sus datos
                $data[] = [
                    'id' => $planificacion->idPlanificacion,
                    'nombreEmpresa' => $empresa->nombreEmpresa,
                    'nombreLargo' => $empresa->nombreLargo,
                    'idEmpresa' => $planificacion->idEmpresa,
                    'aceptada' => $planificacion->aceptada,
                    'numeroSprints' => $planificacion->sprints->count(), // Contar el número de sprints, innecesario
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
            // Si no hay planificación, devolver datos por defecto, indicando que en realidad no se tiene planificacion
            return response()->json([
                'message' => 'La empresa no envió su planificación aún.',
                'idEmpresa' => $empresa->idEmpresa,
                'idPlanificacion' => -1,
                'aceptada' => null,
                'publicada' => null,
                'comentariopublico' => null,
                'sprints' => [
                    ['idSprint' => null, 'fechaIni' => '2025-02-05', 'fechaFin' => '2025-02-12', 'cobro' => 100, 'fechaEntrega' => '2025-02-12', 'entregables' => [['descripcionEntregable' =>'entregable de ejemplo']]],
                ],  // Array de sprints con 1 fila de ejemplo
            ], 200);  // Código 200 ya que la empresa existe
        }


        // Si la planificación existe, devolver los datos correspondientes
        $data = [
            'idPlanificacion' => $planificacion->idPlanificacion,
            'idEmpresa' => $planificacion->idEmpresa,
            'aceptada' => $planificacion->aceptada,
            'publicada' => $planificacion->publicada,
            'fechaEntrega' => $planificacion->fechaEntrega,
            'comentariopublico' => $planificacion->comentariopublico,
            'comentarioprivado' => $planificacion->comentarioprivado,
            'sprints' => $planificacion->sprints->map(function ($sprint) {
                return [
                    'idSprint' => $sprint->idSprint,
                    'numeroSprint'=> $sprint->numeroSprint,
                    'fechaIni' => $sprint->fechaIni,
                    'fechaFin' => $sprint->fechaFin,
                    'cobro' => $sprint->cobro,
                    'fechaEntrega' => $sprint->fechaEntrega,
                    'comentariodocente' => $sprint->comentariodocente,
                    'entregables' => $sprint->entregables->map(function ($entregable){
                        return [
                            'descripcionEntregable' =>  $entregable->descripcionEntregable,
                        ];
                    })->toArray()
                ];
            })->toArray()
        ];

        // Retornar la respuesta JSON
        return response()->json($data);
    }
    public function getComentario($idPlanificacion): JsonResponse
    {
        $planificacion = Planificacion::find($idPlanificacion);

        if (!$planificacion) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        }


        $data = [
            'comentariopublico' => $planificacion->comentariodocente ?? null,
            'fechaEntrega' => $planificacion->fechaEntrega
        ];

        // Retornar la respuesta JSON
        return response()->json($data);
    }

    
    public function addRevision(Request $request)
    {
        try {
            // validar datos
            $validator = Validator::make($request->all(), [
                'idEmpresa' => 'required|integer',
                'comentariopublico' => 'required|string',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Los datos proporcionados no son válidos.',
                    'errors' => $validator->errors()
                ], 422);
            }
            $validatedData = $validator->validated();
            //anadir comentario grupal, comentario privado y nota, 
            //verificar que la planificacion de la empresa existe
            $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();
            if (!$planificacion) {
                return response()->json([
                    'message' => 'No se encontró la planificación para la empresa especificada.'
                ], 404);
            }
            // Añadir comentario del docente
            if (isset($validatedData['comentariopublico'])) {
                $planificacion->comentariopublico = $validatedData['comentariopublico'];
            }
            // Guardar los cambios
            $planificacion->save();
            // devolver respuesta exitosa
            return response()->json([
                'message' => 'Revisión guardada exitosamente.'
            ], 200);
        } catch (Exception $e) {
            // Capturar otros errores
            return response()->json([
                'message' => 'Hubo un error al procesar la solicitud.',
                'error' => $e->getMessage()
            ], 500);
        }
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
            $planificacion->publicada = 1;
            $planificacion->save();
            return response()->json([
                'message' => 'Planificación aceptada con éxito',
                'planificacion' => $planificacion
            ]);
        }
    }
    
    public function rechazar(Request $request)
    {
        $validatedData = $request->validate([
            'idEmpresa' => 'required|integer',
        ]);

        $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();

        if ($planificacion === null) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        } else {
            $planificacion->aceptada = 0;
            $planificacion->publicada = 0;
            $planificacion->save();
            return response()->json([
                'message' => 'Planificación rechazada con éxito',
                'planificacion' => $planificacion
            ]);
        }
    }

    public function publicar(Request $request)
    {
        $validatedData = $request->validate([
            'idEmpresa' => 'required|integer',
        ]);

        $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();

        if ($planificacion === null) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        } else {
            $planificacion->publicada = 1;
            $planificacion->save();
            return response()->json([
                'message' => 'Planificación publicada con éxito',
                'planificacion' => $planificacion
            ]);
        }
    }

    public function guardarPlanificacion(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'aceptada' => 'required|boolean',
            'comentarioDocente' => 'string',
            'idEmpresa' => 'required|integer|exists:empresa,idEmpresa',
        ], [
            'aceptada.required' => 'El campo aceptada es obligatorio.',
            'aceptada.boolean' => 'El campo aceptada debe ser verdadero o falso.',
            'comentarioDocente.string' => 'El comentario del docente debe ser una cadena de texto.',
            'idEmpresa.required' => 'El ID de la empresa es obligatorio.',
            'idEmpresa.integer' => 'El ID de la empresa debe ser un número entero.',
            'idEmpresa.exists' => 'La empresa especificada no existe.',
        ]);
    
        // si no valida, devuelve error
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos. Por favor, contacte a un administrador.',
                'errors' => $validator->errors()
            ], 422);
        }
        //consigue los datos validados
        $validatedData = $validator->validated();
        try {
            // verifica que  la planificación exista
            $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();

            if ($planificacion !== null) {
                // si la planificacion existe, se actualiza la fechaEntrega y se eliminan los campos de notaplanificacion y comentariodocente
                $planificacion->fechaEntrega = Carbon::now('America/Caracas')->format('Y-m-d H:i:s'); // ajustado a la zona horaria de Bolivia
                $planificacion->comentariopublico = null;
                $planificacion->save();
            } else {
                // si la planificacion no existe, se crea una nueva planificacion
                $planificacion = new Planificacion();
                $planificacion->idEmpresa = $validatedData['idEmpresa'];
                $planificacion->aceptada = null;
                $planificacion->publicada = 0;
                $planificacion->fechaEntrega = Carbon::now('America/Caracas')->format('Y-m-d H:i:s');
                $planificacion->save();
            }
            DB::commit();
            return response()->json([
                'message' => 'La Planificación fue modificada correctamente',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Hubo un error al modificar la Planificación',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function testModificarPlanificacion()
    {
        // Simular una solicitud con datos de prueba
        $requestData = [
            'aceptada' => true,
            'comentariopublico' => 'Comentario de prueba',
            'idEmpresa' => 1, // Asegúrate de que este ID exista en tu base de datos
        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función modificarPlanificacion
        $response = $this->modificarPlanificacion($request);
        return $response;
    }
}
