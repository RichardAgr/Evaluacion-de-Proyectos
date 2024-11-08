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
use App\Models\Empresa;
use App\Models\NotaSprint;
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
            'sprints.*.cobro' => 'required|numeric|between:0,100|regex:/^\d+(\.\d{1,2})?$/'

        ]);

        // * verificar que ninguno de los sprints tenga la
        // * fecha de inicio anterior a la fecha fin del anterior sprint
        $validator->after(function ($validator) use ($request) {
            $sprints = $request->input('sprints');
            $totalCobro = 0;

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

                // Sumar el cobro de cada sprint
                $totalCobro += $sprints[$i]['cobro'];
            }

            // Verificar que el total de cobro sea exactamente 100
            if ($totalCobro != 100) {
                $validator->errors()->add('sprints', 'La suma total de los cobros de todos los sprints debe ser exactamente 100%.');
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
            $numeroSprint = 1; //contador para indicar el numero del Sprint en el que se encuentra
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

    public function integrantesPorTarea(int $idTarea): JsonResponse
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
            ->get(['estudiante.idEstudiante', 'fotoestudiante.idFoto', 'fotoestudiante.foto']);

        // Preparar la respuesta
        $response = [
            'idTarea' => $tarea->idTarea,
            'dTarea' => $tarea->dTarea,
            'idSemana' => $tarea->idSemana,
            'estudiantes' => $estudiantes
        ];

        // Devolver la respuesta en formato JSON
        return response()->json($response);
    }

    public function obtenerSemanasYTareas($idSprint)
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
    }
    ///////ETHAN

    public function obtenerNotasPorEstudiante(Request $request)
    {
        $request->validate([
            'idSprint' => 'required|integer',  // Sprint es un identificador relacionado
        ]);

        //$idSprint = $request->input('idSprint');

        // Asumiendo que hay una relación entre semana y sprint en alguna tabla
        $notas = DB::table('notassemana')
            ->join('semana', 'notassemana.idSemana', '=', 'semana.idSemana')
            ->join('sprint', 'notassemana.idSemana', '=', 'semana.')
            ->where('semana.idSemana', $request->idSemana)
            ->select('notassemana.idEstudiante', DB::raw('SUM(nota) as totalNota'), DB::raw('COUNT(notassemana.idSemana) as semanasCount'))
            ->groupBy('notassemana.idEstudiante')
            ->get();

        // Calcular el promedio si hay más de dos semanas
        $resultado = $notas->map(function ($nota) {
            if ($nota->semanasCount > 2) {
                $nota->promedioNota = $nota->totalNota / $nota->semanasCount;
            } else {
                $nota->promedioNota = $nota->totalNota;
            }
            return $nota;
        });

        return response()->json($resultado, 200);
    }

    public function getSprintEvaluar($idEmpresa, $idSprint)
    {
        try {
            // Obtener la empresa
            $empresa = Empresa::select('nombreEmpresa', 'nombreLargo')->findOrFail($idEmpresa);

            // Obtener el sprint con la relación planificacion y las semanas asociadas
            $sprint = Sprint::with('planificacion', 'semanas.tareas')
                ->where('idSprint', $idSprint)
                ->firstOrFail();

            // Obtener cada estudiante de la empresa
            $estudiantes = DB::table('estudiantesempresas')
                ->join('estudiante', 'estudiante.idEstudiante', '=', 'estudiantesempresas.idEstudiante')
                ->where('estudiantesempresas.idEmpresa', $idEmpresa)
                ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido')
                ->get();

            $result = [
                'sprint' => $sprint->numeroSprint,
                'empresa' => [
                    'nombre' => $empresa->nombreEmpresa,
                    'nombreLargo' => $empresa->nombreLargo,
                ],
                'estudiantes' => $estudiantes->map(function ($estudiante) use ($sprint, $idEmpresa) {
                    // Obtener todas las tareas del estudiante en el sprint
                    $tareas = [];
                    foreach ($sprint->semanas as $semana) {
                        foreach ($semana->tareas as $tarea) {
                            $tareas[] = ['nombreTarea' => $tarea->nombreTarea];
                        }
                    }

                    // Obtener las notas del estudiante para el sprint
                    $notaSprint = NotaSprint::where([
                        'idEmpresa' => $idEmpresa,
                        'idEstudiante' => $estudiante->idEstudiante,
                        'idSprint' => $sprint->idSprint,
                    ])->first();

                    return [
                        'estudiante' => [
                            'idEstudiante' => $estudiante->idEstudiante,
                            'nombre' => $estudiante->nombreEstudiante,
                            'primerApellido' => $estudiante->primerApellido,
                            'segundoApellido' => $estudiante->segundoApellido,
                        ],
                        'tareas' => $tareas,
                        'idEvaluacionsemanal' => $notaSprint->idEvaluacionsemanal ?? null,
                        'nota' => $notaSprint->nota ?? null,
                        'comentario' => $notaSprint->comentario ?? null,
                    ];
                }),
            ];

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener los detalles del sprint: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateSprintEvaluar(Request $request, $idEmpresa, $idSprint)
    {
        try {
            $data = $request->input('estudiantes');

            foreach ($data as $estudiante) {
                NotaSprint::updateOrCreate(
                    [
                        'idEmpresa' => $idEmpresa,
                        'idEstudiante' => $estudiante['idEstudiante'],
                        'idSprint' => $idSprint,
                    ],
                    [
                        // 'nota' => $estudiante['nota'],
                        'comentario' => $estudiante['comentario']
                    ]
                );
            }

            return response()->json(['message' => 'Evaluación actualizada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la evaluación: ' . $e->getMessage()], 500);
        }
    }
    public function getListaSprintsPorIdEmpresa(Request $request): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->query(), [
            'idEmpresa' => 'required|integer|exists:empresa,idEmpresa',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validación fallida',
                'errors' => $validator->errors()
            ], 422);
        }

        $idEmpresa = $request->query('idEmpresa');

        // Obtener el ID de la planificación
        $requestPlani = new Request();
        $requestPlani->merge(['idEmpresa' => $idEmpresa]);
        $response = $this->getIdPlanificacion($requestPlani);
        $idPlanificacion = $response->original['idPlanificacion'];

        try {
            // Check if the planificacion exists
            $planificacion = Planificacion::findOrFail($idPlanificacion);

            // Get all sprints for the planificacion
            $sprints = Sprint::where('idPlanificacion', $idPlanificacion)
                ->orderBy('numeroSprint', 'asc')
                ->get();

            if ($sprints->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron sprints para esta planificación',
                    'data' => []
                ], 200);
            }

            // Transform the data to include all relevant information
            $sprintsData = $sprints->map(function ($sprint) {
                return [
                    'idSprint' => $sprint->idSprint,
                    'idPlanificacion' => $sprint->idPlanificacion,
                    'numeroSprint' => $sprint->numeroSprint,
                ];
            });

            return response()->json([
                'message' => 'Sprints obtenidos exitosamente',
                'data' => $sprintsData
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Planificación no encontrada',
                'error' => 'No se encontró una planificación con el ID proporcionado.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los sprints',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getSprintPorId(Request $request): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->query(), [
            'idSprint' => 'required|integer|exists:sprint,idSprint',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validación fallida',
                'errors' => $validator->errors()
            ], 422);
        }

        $idSprint = $request->query('idSprint');

        try {
            // Find the sprint
            $sprint = Sprint::findOrFail($idSprint);

            // Transform the data to include all relevant information
            $sprintData = [
                'idSprint' => $sprint->idSprint,
                'idPlanificacion' => $sprint->idPlanificacion,
                'numeroSprint' => $sprint->numeroSprint,
                'fechaIni' => $sprint->fechaIni,
                'fechaFin' => $sprint->fechaFin,
                'fechaEntrega' => $sprint->fechaEntrega,
                'cobro' => $sprint->cobro,
            ];

            // Load related entregables
            $entregables = $sprint->entregables()->get();
            $sprintData['entregables'] = $entregables->map(function ($entregable) {
                return [
                    'idEntregables' => $entregable->idEntregables,
                    'descripcionEntregable' => $entregable->descripcionEntregable,
                ];
            });

            return response()->json([
                'message' => 'Sprint obtenido exitosamente',
                'data' => $sprintData
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Sprint no encontrado',
                'error' => 'No se encontró un sprint con el ID proporcionado.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el sprint',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function testSprintPorId()
    {
        // Simular una solicitud con datos de prueba
        $requestData = [
            'idSprint' => 4, // Asegúrate de que este ID exista en tu base de datos

        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función modificarSprint
        $response = $this->getSprintPorId($request);
        return $response;
    }
    public function testListaSprintsPorIdEmpresa()
    {
        // Simular una solicitud con datos de prueba
        $requestData = [
            'idEmpresa' => 1, // Asegúrate de que este ID exista en tu base de datos
           
        ];

        // Crear una nueva instancia de Request con los datos de prueba
        $request = new Request($requestData);

        // Llamar a la función modificarSprint
        $response = $this->getListaSprintsPorIdEmpresa($request);
        return $response;
    }

    public function actualizarNotaComentario(Request $request, $idSprint)
    {
        try {

            $sprint = Sprint::findOrFail($idSprint);

            $sprint->comentario = $request->input('comentario', '');
            $sprint->nota = $request->input('nota', 0);
            $sprint->save();

            return response()->json(['message' => 'Sprint actualizado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el sprint: ' . $e->getMessage()], 500);
        }
    }
}
