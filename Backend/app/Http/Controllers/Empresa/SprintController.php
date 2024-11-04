<?php

namespace App\Http\Controllers\Empresa;
use Illuminate\Http\Request;
use App\Models\Planificacion;
use App\Models\Sprint;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Semana;
use App\Models\Tarea;
use App\Http\Controllers\Controller;
class SprintController extends Controller
{
    public function modificarSprint(Request $request): JsonResponse
    {
        // * Validar todos los datos
        $today = Carbon::today()->toDateString();
        $validator = Validator::make($request->all(), [
            'idEmpresa' => 'required|integer|exists:empresa,idEmpresa',
            'sprints' => 'required|array|min:1',
            'sprints.*.fechaIni' => [
                'required',
                'date',
                'after_or_equal:' . $today,
            ],
            'sprints.*.fechaFin' => [
                'required',
                'date',
                'after_or_equal:sprints.*.fechaIni',
            ],
            'sprints.*.fechaEntrega' => [
                'required',
                'date',
                'after_or_equal:sprints.*.fechaFin',
            ],
            'sprints.*.cobro' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',

        ]);
        // * verificar que ninguno  de los sprints tenga la
        // * fecha de inicio anterior a la fecha fin del anterior sprint
        $validator->after(function ($validator) use ($request) {
            $sprints = $request->input('sprints');
            for ($i = 0; $i < count($sprints); $i++) {
                $startDate = Carbon::parse($sprints[$i]['fechaIni']);
                $endDate = Carbon::parse($sprints[$i]['fechaFin']);

                // Verificar que la fecha de fin sea al menos 7 días después de la fecha de inicio
                if ($endDate->diffInDays($startDate) < 7) {
                    $validator->errors()->add("sprint.{$i}.fechaFin", 'La fecha de fin debe ser al menos 7 días después de la fecha de inicio.');
                }

                // Verificar que la fecha de inicio no sea anterior a la fecha fin del sprint anterior
                if ($i > 0) {
                    $prevSprintEnd = Carbon::parse($sprints[$i - 1]['fechaFin']);
                    if ($startDate->lt($prevSprintEnd)) {
                        $validator->errors()->add("sprints.{$i}.fechaIni", 'La fecha de inicio no puede ser anterior a la fecha de fin del sprint anterior.');
                    }
                }
            }
        });
        
        // * devuelve todos los errores en un array error[]
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => $validator->errors()
            ], 422);
        }

        // * si todo salio bien, recibe el ID de la planificacion que tenga la empresa
        $validatedData = $validator->validated();
        $requestPlani = new Request();
        $requestPlani->merge(['idEmpresa' => $validatedData['idEmpresa']]);
        $response = $this->getIdPlanificacion($requestPlani);
        $idPlanificacion = $response->original['idPlanificacion'];

        // * crear todos los sprints para la planificacion
        try {
            DB::beginTransaction();

            // * buscar y eliminar los sprints anteriores
            Sprint::where('idPlanificacion', $idPlanificacion)->delete();
            $numeroSprint=1; //contador para indicar el numero del Sprint en el que se encuentra
            $sprintsInfo = []; // guardar los datos de los  sprints para poder guardar sus entregables en ellos
            // * insertar los sprints actuales
            foreach ($validatedData['sprints'] as $sprintData) {
                $sprint = new Sprint();
                $sprint->idPlanificacion = $idPlanificacion;
                $sprint->numeroSprint = $numeroSprint;
                $sprint->fechaIni = $sprintData['fechaIni'];
                $sprint->fechaFin = $sprintData['fechaFin'];
                $sprint->fechaEntrega = $sprintData['fechaEntrega'];
                $sprint->cobro = $sprintData['cobro'];
                $sprint->save();
                
                $sprintsInfo[] = [
                    'idSprint' => $sprint->idSprint,
                    'numeroSprint' => $sprint->numeroSprint
                ];

                $numeroSprint++;
            }
            // * si todo salio bien, devuelve un mensaje de exito y el id de los sprints
            DB::commit();
            return response()->json([
                'message' => 'La Planificación fue modificada correctamente',
                'sprints' => $sprintsInfo
            ], 200);
        } catch (\Exception $e) {
            // * si ocurrio un error, devuelve un mensaje de error y deshace todos los cambios realizados
            DB::rollBack();
            return response()->json([
                'message' => 'Hubo un error al modificar la Planificación',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getIdPlanificacion(Request $request)
    {
        //validar datos
        $validatedData = $request->validate([
            'idEmpresa' => 'required|integer',
        ]);
        //buscar la planificacion con ese  idEmpresa
        $planificacion = Planificacion::where('idEmpresa', $validatedData['idEmpresa'])->first();
        if ($planificacion == null) {
            return response()->json(['error' => 'Planificación no encontrada para esta empresa'], 404);
        } else {
            return response()->json(['idPlanificacion' => $planificacion->idPlanificacion]);
        }
    }
    public function testModificarSprint()
    {
        // Simular una solicitud con datos de prueba
        $requestData = [
            'idEmpresa' => 1, // Asegúrate de que este ID exista en tu base de datos
            'sprints' => [
                [
                    'fechaIni' => Carbon::tomorrow()->addDays(3)->toDateString(),
                    'fechaFin' => Carbon::tomorrow()->addDays(7)->toDateString(),
                    'cobro' => 1000,
                    'fechaEntrega' => Carbon::tomorrow()->addDays(8)->toDateString(),
                    'entregables' => 'Entregable de prueba 1',
                    'notaSprint' => 'Nota de prueba 1',
                    'comentariodocente' => 'Comentario de prueba 1'
                ],
                [
                    'fechaIni' => Carbon::tomorrow()->addDays(8)->toDateString(),
                    'fechaFin' => Carbon::tomorrow()->addDays(15)->toDateString(),
                    'cobro' => 1500,
                    'fechaEntrega' => Carbon::tomorrow()->addDays(16)->toDateString(),
                    'entregables' => 'Entregable de prueba 2',
                    'notaSprint' => 'Nota de prueba 2',
                    'comentariodocente' => 'Comentario de prueba 2'
                ]
            ]
        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función modificarSprint
        $response = $this->modificarSprint($request);
        return $response;
    }

    public function sprintsSemanas(int $idSprint): JsonResponse
    {
        // Obtener el sprint con su comentario y nota
        $sprint = Sprint::find($idSprint, ['idSprint']);
        
        // Verificar si el sprint existe
        if (!$sprint) {
            return response()->json(['error' => 'Sprint no encontrado'], 404);
        }
    
        // Obtener los datos de las semanas asociadas al sprint
        $semanas = Semana::where('idSprint', $idSprint)->get(['idSemana']);
    
        // Preparar la respuesta
        $response = [
            'idSprint' => $sprint->idSprint,
            'semanas' => []
        ];
    
        // Iterar sobre cada semana para obtener las tareas
        foreach ($semanas as $semana) {
            // Obtener las tareas asociadas a la semana
            $tareas = Tarea::where('idSemana', $semana->idSemana)->get([
                'idTarea',
                'idSemana',
                'textoTarea',
                'nombreTarea'
            ]);
            
            // Agregar la semana y sus tareas al response
            $response['semanas'][] = [
                'idSemana' => $semana->idSemana,
                'tareas' => $tareas
            ];
        }
    
        // Devolver la respuesta en formato JSON
        return response()->json($response);
    }

    /*public function integrantesPorTarea(int $idTarea): JsonResponse
    {
        // Obtener la tarea con su información básica
        $tarea = Tarea::find($idTarea, ['idTarea', 'idTarea', 'idSemana']);

        // Verificar si la tarea existe
        if (!$tarea) {
        return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        // Obtener los estudiantes encargados de la tarea a través de la tabla tareasEstudiante
        $estudiantes = DB::table('tareasEstudiantes')
        ->join('estudiante', 'tareasEstudiantes.idEstudiante', '=', 'estudiante.idEstudiante') 
        ->join('fotoestudiante', 'estudiante.idEstudiante', '=', 'fotoestudiante.idEstudiante')
        ->where('tareasEstudiantes.idTarea', $idTarea)
        ->get(['estudiante.idEstudiante', 'fotoestudiante.idFoto','fotoestudiante.foto']);

        // Preparar la respuesta
        $response = [
        'idTarea' => $tarea->idTarea,
        'dTarea' => $tarea->dTarea,
        'idSemana' => $tarea->idSemana,
        'estudiantes' => $estudiantes
        ];

        // Devolver la respuesta en formato JSON
        return response()->json($response);
    }*/

    /*public function obtenerSemanasYTareas($idSprint)
    {
        try {
    
            $sprint = Sprint::with(['semanas.tareas'])->findOrFail($idSprint);

    
            $response = [
                'success' => true,
                'sprint' => $sprint->idSprint,
                'semanas' => $sprint->semanas->map(function ($semana) {
                    return [
                        'idSemana' => $semana->idSemana,
                        'tareas' => $semana->tareas->map(function ($tarea) {
                            return [
                                'idTarea' => $tarea->idTarea,
                                'comentario' => $tarea->comentario,
                                'textoTarea' => $tarea->textoTarea,
                                'fechaEntrega' => $tarea->fechaEntrega,
                                'notaTarea' => $tarea->notaTarea
                            ];
                        }),
                    ];
                }),
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los datos del sprint.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }*/
}
