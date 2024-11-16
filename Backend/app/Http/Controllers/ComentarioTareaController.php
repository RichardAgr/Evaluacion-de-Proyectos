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
            ->where('semana_idSemana', $idSemana)
            ->get();

        return response()->json($comentarios);
    }
    public function agregarComentarios(Request $request)
    {
        // Validación del array de comentarios
        $validated = $request->validate([
            'comentarios' => 'required|array',
            'comentarios.*.estudiante_idEstudiante' => 'required|exists:estudiante,idEstudiante',
            'comentarios.*.semana_idSemana' => 'required|exists:semana,idSemana',
            'comentarios.*.comentario' => 'required|string|max:255',
        ]);
    
        $comentariosGuardados = [];
    
        // Procesar cada comentario
        foreach ($validated['comentarios'] as $comentarioData) {
            try {
                // Actualizar o crear comentario en una sola operación
                $comentario = ComentarioTarea::updateOrCreate(
                    [
                        'estudiante_idEstudiante' => $comentarioData['estudiante_idEstudiante'],
                        'semana_idSemana' => $comentarioData['semana_idSemana'],
                    ],
                    [
                        'comentario' => $comentarioData['comentario'],
                    ]
                );
    
                $comentariosGuardados[] = $comentario; // Agregar comentario procesado
            } catch (\Exception $e) {
                // Capturar errores específicos por comentario
                return response()->json([
                    'error' => 'Error al procesar el comentario para el estudiante: ' . $comentarioData['estudiante_idEstudiante'] . 
                               ', semana: ' . $comentarioData['semana_idSemana'] . '. Detalles: ' . $e->getMessage()
                ], 400);
            }
        }
    
        // Respuesta exitosa con todos los comentarios procesados
        return response()->json([
            'message' => 'Comentarios procesados exitosamente',
            'data' => $comentariosGuardados,
        ], 200);
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
            ->where('idPlanificacion', $planificacion->idPlanificacion) // Filtrar sprints por planificación
            ->get();
    
        $resultado = [];
        $fechaDeLaConsulta = now();
        $resultado = [];

foreach ($sprints as $sprint) {
    $sprintData = [
        'idSprint' => $sprint->idSprint,
        'numSprint' => $sprint->numeroSprint,
        'semanas' => []
    ];

    // Obtener las semanas del sprint
    $semanas = $sprint->semanas()
        ->where(function ($query) use ($fechaDeLaConsulta, $sprint) {
            $query->where('idSprint', $sprint->idSprint) // Filtrar semanas por el sprint actual
                ->where(function ($subQuery) use ($fechaDeLaConsulta) {
                    // Condición 1: (fechaIni <= fechaDeLaConsulta < fechaFin)
                    $subQuery->whereDate('fechaIni', '<=', $fechaDeLaConsulta)
                        ->whereDate('fechaFin', '>', $fechaDeLaConsulta);
                })
                ->orWhere(function ($subQuery) use ($fechaDeLaConsulta) {
                    // Condición 2: (fechaFin <= fechaDeLaConsulta)
                    $subQuery->whereDate('fechaFin', '<=', $fechaDeLaConsulta);
                });
        })
        ->get();

    foreach ($semanas as $semana) {
        // Inicializar las tareas de los estudiantes
        $tareasEstudianteData = [];

        foreach ($semana->tareas as $tarea) {
            foreach ($tarea->tareaEstudiantes as $tareaEstudiante) {
                $idEstudiante = $tareaEstudiante->estudiantes->idEstudiante;

                // Si el estudiante ya está en el arreglo, agregar la tarea
                if (isset($tareasEstudianteData[$idEstudiante])) {
                    $tareasEstudianteData[$idEstudiante]['tareas'][] = [
                        'idTarea' => $tarea->idTarea,
                        'nombreTarea' => $tarea->nombreTarea
                    ];
                } else {
                    // Si el estudiante no existe, crear su entrada
                    $tareasEstudianteData[$idEstudiante] = [
                        'idEstudiante' => $idEstudiante,
                        'nombre' => $tareaEstudiante->estudiantes->nombreEstudiante,
                        'apellido' => $tareaEstudiante->estudiantes->primerApellido,
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

        // Convertir a valores indexados para no mantener las claves asociativas
        $sprintData['semanas'][] = [
            'idSemana' => $semana->idSemana,
            'numSemana' => $semana->numeroSemana,
            'tareasEstudiante' => array_values($tareasEstudianteData)
        ];
    }

    $resultado[] = $sprintData;
}

    
        return response()->json($resultado);
    }
}
