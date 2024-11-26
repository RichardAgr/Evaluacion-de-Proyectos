<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\ComentarioTarea;
use App\Models\Empresa;
use App\Models\Planificacion;
use App\Models\Sprint;
use App\Models\Semana;
use App\Models\Tarea;
use App\Models\TareaEstudiante;
use App\Models\Estudiante;
use Carbon\Carbon;



class ComentarioTareaController extends Controller
{
    public function seguimientoSemanaElegidaComentarios($idSemana)
    {
        $comentarios = ComentarioTarea::with('estudiante')
            ->where('idSemana', $idSemana)
            ->get();

        return response()->json($comentarios);
    }
    public function agregarComentarios(Request $request)
    {
        // Validación del array de comentarios
        $validated = $request->validate([
            'comentarios' => 'required|array',
            'comentarios.*.idEstudiante' => 'required|exists:estudiante,idEstudiante',
            'comentarios.*.idSemana' => 'required|exists:semana,idSemana',
            'comentarios.*.comentario' => 'required|string|max:255',
        ]);
    
        $comentariosGuardados = [];
    
        // Procesar cada comentario
        foreach ($validated['comentarios'] as $comentarioData) {
            try {
                // Actualizar o crear comentario en una sola operación
                $comentario = ComentarioTarea::updateOrCreate(
                    [
                        'idEstudiante' => $comentarioData['idEstudiante'],
                        'idSemana' => $comentarioData['idSemana'],
                    ],
                    [
                        'comentario' => $comentarioData['comentario'],
                    ]
                );
    
                $comentariosGuardados[] = $comentario; // Agregar comentario procesado
            } catch (\Exception $e) {
                // Capturar errores específicos por comentario
                return response()->json([
                    'error' => 'Error al procesar el comentario para el estudiante: ' . $comentarioData['idEstudiante'] . 
                               ', semana: ' . $comentarioData['idSemana'] . '. Detalles: ' . $e->getMessage()
                ], 400);
            }
        }
    
        // Respuesta exitosa con todos los comentarios procesados
        return response()->json([
            'message' => 'Comentarios procesados exitosamente',
            'data' => $comentariosGuardados,
        ], 200);
    }
        
    public function seguimientoSemanalHastaSemanaActualcomentarios($idEmpresa)
    {
        // Obtener la empresa
        $empresa = Empresa::findOrFail($idEmpresa);

        // Obtener la planificación aceptada y publicada de la empresa
        $planificacion = $empresa->planificaciones()
            ->where('aceptada', true)
            ->where('publicada', true)
            ->first();

        if (!$planificacion) {
            return response()->json(['error' => 'No se encontró planificación aceptada y publicada'], 404);
        }

        // Obtener los sprints de la planificación que cumplen con la condición de fecha
        $sprints = $planificacion->sprints()
            ->where(function ($query) {
                $query->whereDate('fechaIni', '<=', now())
                    ->whereDate('fechaFin', '>=', now());
            })
            ->orWhereDate('fechaFin', '<', now())
            ->where('idPlanificacion', $planificacion->idPlanificacion)
            ->get();

        $resultado = [];
        $fechaDeLaConsulta = now();

        foreach ($sprints as $sprint) {
            $sprintData = [
                'idSprint' => $sprint->idSprint,
                'numSprint' => $sprint->numeroSprint,
                'semanas' => []
            ];

            // Obtener las semanas del sprint
            $semanas = $sprint->semanas()
                ->where(function ($query) use ($fechaDeLaConsulta) {
                    $query->whereDate('fechaIni', '<=', $fechaDeLaConsulta)
                        ->whereDate('fechaFin', '>', $fechaDeLaConsulta)
                        ->orWhereDate('fechaFin', '<=', $fechaDeLaConsulta);
                })
                ->get();

            foreach ($semanas as $semana) {
                // Obtener los comentariosTareas para cada semana
                $comentariosTareas = $semana->comentarioTarea()->get()->map(function ($comentario) {
                    return [
                        'idEstudiante' => $comentario->idEstudiante,
                        'comentario' => $comentario->comentario,
                    ];
                });

                $semanaData = [
                    'idSemana' => $semana->idSemana,
                    'numeroSemana' => $semana->numeroSemana,
                    'comentariosTareas' => $comentariosTareas,
                ];

                $sprintData['semanas'][] = $semanaData;
            }

            $resultado[] = $sprintData;
        }

    return response()->json($resultado);
}



    public function seguimientoSemanalEmpresaHastaSemanaActual($idEmpresa)
    {
        // Obtener la empresa
        $empresa = Empresa::findOrFail($idEmpresa);

        // Obtener la planificación aceptada y publicada de la empresa
        $planificacion = $empresa->planificaciones()
            ->where('aceptada', true)
            ->where('publicada', true)
            ->first();

        if (!$planificacion) {
            return response()->json(['error' => 'No se encontró planificación aceptada y publicada'], 404);
        }

        // Obtener los sprints de la planificación que cumplen con la condición de fecha
        $sprints = $planificacion->sprints()
            ->where(function ($query) {
                $query->whereDate('fechaIni', '<=', now())
                    ->whereDate('fechaFin', '>=', now());
            })
            ->orWhereDate('fechaFin', '<', now())
            ->where('idPlanificacion', $planificacion->idPlanificacion)
            ->get();

        $resultado = [];
        $fechaDeLaConsulta = now();

        foreach ($sprints as $sprint) {
            $sprintData = [
                'idSprint' => $sprint->idSprint,
                'numSprint' => $sprint->numeroSprint,
                'fechaIni' => $sprint->fechaIni,
                'fechaFin' => $sprint->fechaFin,
                'semanas' => []
            ];

            // Obtener las semanas del sprint
            $semanas = $sprint->semanas()
                ->where(function ($query) use ($fechaDeLaConsulta, $sprint) {
                    $query->where('idSprint', $sprint->idSprint)
                        ->where(function ($subQuery) use ($fechaDeLaConsulta) {
                            $subQuery->whereDate('fechaIni', '<=', $fechaDeLaConsulta)
                                ->whereDate('fechaFin', '>', $fechaDeLaConsulta);
                        })
                        ->orWhere(function ($subQuery) use ($fechaDeLaConsulta) {
                            $subQuery->whereDate('fechaFin', '<=', $fechaDeLaConsulta);
                        });
                })
                ->get();

            foreach ($semanas as $semana) {
                // Inicializar arreglo de tareas únicas
                $tareasSemana = [];
                $tareasEstudianteData = [];

                foreach ($semana->tareas as $tarea) {
                    // Asegurarse de que no haya duplicados en tareas de la semana
                    if (!isset($tareasSemana[$tarea->idTarea])) {
                        $tareasSemana[$tarea->idTarea] = [
                            'idTarea' => $tarea->idTarea,
                            'nombreTarea' => $tarea->nombreTarea
                        ];
                    }

                    // Procesar las tareas por estudiantes
                    foreach ($tarea->tareaEstudiantes as $tareaEstudiante) {
                        $idEstudiante = $tareaEstudiante->estudiantes->idEstudiante;

                        if (isset($tareasEstudianteData[$idEstudiante])) {
                            $tareasEstudianteData[$idEstudiante]['tareas'][] = [
                                'idTarea' => $tarea->idTarea,
                                'nombreTarea' => $tarea->nombreTarea
                            ];
                        } else {
                            $tareasEstudianteData[$idEstudiante] = [
                                'idEstudiante' => $idEstudiante,
                                'nombre' => $tareaEstudiante->estudiantes->nombreEstudiante,
                                'apellido' => $tareaEstudiante->estudiantes->primerApellido . ' ' . $tareaEstudiante->estudiantes->segundoApellido,
                                'tareas' => [
                                    [
                                        'idTarea' => $tarea->idTarea,
                                        'nombreTarea' => $tarea->nombreTarea
                                    ]
                                ]
                            ];
                        }
                    }
                }

                // Agregar la información de la semana al sprint
                $sprintData['semanas'][] = [
                    'idSemana' => $semana->idSemana,
                    'numSemana' => $semana->numeroSemana,
                    'fechaIni' => $semana->fechaIni,
                    'fechaFin' => $semana->fechaFin,
                    'tareas' => array_values($tareasSemana), // Tareas únicas en la semana
                    'tareasEstudiante' => array_values($tareasEstudianteData) // Tareas por estudiante
                ];
            }

            $resultado[] = $sprintData;
        }

        return response()->json($resultado);
    }
    public function getSemanaActualTareas($idEmpresa)
    {
        try {
            $fechaDeLaConsulta = now(); // Fecha actual

            // Recuperar los sprints que cumplan con la condición
            $empresa = Empresa::findOrFail($idEmpresa);

            $sprints = $empresa->sprints()
                ->where('fechaIni', '<=', $fechaDeLaConsulta)
                ->where('fechaFin', '>=', $fechaDeLaConsulta)
                ->with(['semanas' => function ($query) {
                    // Elimina el filtro de fechas para obtener todas las semanas
                    $query->with(['tareas:idSemana,idTarea,nombreTarea']);
                }])->get();


            // Transformar los datos al formato solicitado
            return response()->json($sprints, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los datos: ' . $e->getMessage()], 500);
        }
    }
}
