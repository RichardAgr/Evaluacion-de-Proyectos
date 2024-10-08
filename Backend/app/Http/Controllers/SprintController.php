<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Semana;
use App\Models\Sprint;
use App\Models\Tarea;

class SprintController extends Controller 
{


    public function sprintsSemanas(int $idSprint): JsonResponse
    {
        // Obtener el sprint con su comentario y nota
        $sprint = Sprint::find($idSprint, ['idSprint', 'comentariodocente', 'notasprint']);
        
        // Verificar si el sprint existe
        if (!$sprint) {
            return response()->json(['error' => 'Sprint no encontrado'], 404);
        }
    
        // Obtener los datos de las semanas asociadas al sprint
        $semanas = Semana::where('idSprint', $idSprint)->get(['idSemana']);
    
        // Preparar la respuesta
        $response = [
            'idSprint' => $sprint->idSprint,
            'comentario' => $sprint->comentariodocente,
            'nota' => $sprint->notasprint,
            'semanas' => []
        ];
    
        // Iterar sobre cada semana para obtener las tareas
        foreach ($semanas as $semana) {
            // Obtener las tareas asociadas a la semana
            $tareas = Tarea::where('idSemana', $semana->idSemana)->get([
                'idTarea',
                'idSemana',
                'textoTarea'
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

}