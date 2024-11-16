<?php

namespace App\Http\Controllers;

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
            ->get();

        $resultado = [];
        $fechaDeLaConsulta = now();

        foreach ($sprints as $sprint) {
            $sprintData = [
                'numSprint' => $sprint->numeroSprint,
                'semanas' => []
            ];

            // Obtener las semanas del sprint
            $semanas = $sprint->semanas()->where(
                function ($query) use ($fechaDeLaConsulta) {
                    // Condición 1: (fechaIni <= fechaDeLaConsulta < fechaFin)
                    $query->whereDate('fechaIni', '<=', $fechaDeLaConsulta)
                    ->whereDate('fechaFin', '>', $fechaDeLaConsulta);
                })->orWhere(function ($query) use ($fechaDeLaConsulta) {
                    // Condición 2: (fechaFin <= fechaDeLaConsulta)
                    $query->whereDate('fechaFin', '<=', $fechaDeLaConsulta);
                })->get();
            
            foreach ($semanas as $semana) {
                // Obtener las tareas de la semana
                $tareasEstudianteData = [];
                
                foreach ($semana->tareas as $tarea) {
                    foreach ($tarea->tareaEstudiantes as $tareaEstudiante) {
                        // Recolectar datos de estudiante y sus tareas
                        $tareasEstudianteData[] = [
                            'idEstudiante' => $tareaEstudiante->estudiantes->idEstudiante,
                            'nombre' => $tareaEstudiante->estudiantes->nombreEstudiante,
                            'tareas' => [$tarea->nombreTarea]
                        ];
                    }
                }

                $sprintData['semanas'][] = [
                    'numSemana' => $semana->numeroSemana,
                    'tareasEstudiante' => $tareasEstudianteData
                ];
            }

            $resultado[] = $sprintData;
        }

        return response()->json($resultado);
    }



}
