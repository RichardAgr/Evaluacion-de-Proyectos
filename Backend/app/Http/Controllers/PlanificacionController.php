<?php

namespace App\Http\Controllers;

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
            if ($planificacion && $planificacion->aceptada == 0) {
                // Si la planificación existe y fue rechazada, guarda sus datos
                $data[] = [
                    'idPlanificacion' => $planificacion->idPlanificacion,
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
                'aceptada' => 0,
                'notaPlanificacion' => 0,
                'comentarioDocente' => 'Comentario Docente',
                'sprints' => [
                    ['idSprint' => null, 'fechaIni' => '2024-09-06', 'fechaFin' => '2024-09-06', 'cobro' => 12, 'fechaEntrega' => '2024-09-06', 'entregables' => 'esto es un ejemplo'],
                ],  // Array de sprints con 1 filas vacías  
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

    public function addRevision(Request $request)
    {
        try {
            // validar datos
            $validator = Validator::make($request->all(), [
                'idEmpresa' => 'required|integer',
                'comentario' => 'nullable|string',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Los datos proporcionados no son válidos.',
                    'errors' => $validator->errors()
                ], 422);
            }
            $validatedData = $validator->validated();
            //anadir comentario grupal, comentario privado y nota, 
            //verificar que la fila de la empresa existe
            $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();
            if (!$planificacion) {
                return response()->json([
                    'message' => 'No se encontró la planificación para la empresa especificada.'
                ], 404);
            }
            // Añadir comentario del docente
            if (isset($validatedData['comentario'])) {
                $planificacion->comentariodocente = $validatedData['comentario'];
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
            $planificacion->save();
            return response()->json([
                'message' => 'Planificación aceptada con éxito',
                'planificacion' => $planificacion
            ]);
        }
    }

    public function modificarPlanificacion(Request $request): JsonResponse
    {
        //validar datos
        $validator = Validator::make($request->all(), [
            'aceptada' => 'required|boolean',
            'comentarioDocente' => 'string',
            'idEmpresa' => 'required|integer|exists:empresa,idEmpresa',
        ]);
        // si no valida, devuelve error
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
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
                $planificacion->notaPlanificacion = null;
                $planificacion->comentarioDocente = null;
                $planificacion->save();
            } else {
                // si la planificacion no existe, se crea una nueva planificacion
                $planificacion = new Planificacion();
                $planificacion->idEmpresa = $validatedData['idEmpresa'];
                $planificacion->aceptada = 0;
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
            'comentarioDocente' => 'Comentario de prueba',
            'idEmpresa' => 1, // Asegúrate de que este ID exista en tu base de datos
            'notaPlanificacion' => 85
        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función modificarPlanificacion
        $response = $this->modificarPlanificacion($request);
        return $response;
    }
}
