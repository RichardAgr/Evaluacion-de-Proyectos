<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request; // Asegúrate de importar la clase Request
use Illuminate\Http\JsonResponse; // Para las respuestas JSON
use App\Models\Sprint; // Importa tu modelo Sprint
use App\Models\Empresa; // Asegúrate de importar el modelo Empresa
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Exception;
use App\Models\NotaSprint;

class NotaSprintController extends Controller{
    public function notaSprint(Request $request)
    {   
        $empresa = $request->input('empresa');
        $semana = $request->input('numSprint');
        // Realizar la consulta con joins para unir las tablas estudiante, estudiantesempresas y notasSprint
        $notasSprint = DB::table('notaSprint')
            ->join('estudiantesempresas', function($join) {
                $join->on('notaSprint.idEmpresa', '=', 'estudiantesempresas.idEmpresa')
                     ->on('notaSprint.idEstudiante', '=', 'estudiantesempresas.idEstudiante');
            })
            ->join('estudiante', 'estudiantesempresas.idEstudiante', '=', 'estudiante.idEstudiante')
            ->Join('empresa', 'empresa.idEmpresa', '=', 'estudiantesempresas.idEmpresa') // Si tienes tabla de docente con comentarios
            ->join('tareasestudiantes','estudiante.idEstudiante','=','tareasestudiantes.idEstudiante')
            ->join('tarea','tarea.idTarea','=','tareasestudiantes.idTarea')
            ->join('sprint','sprint.idSprint','=','notaSprint.idSprint')
            ->select(
                'estudiante.idEstudiante',
                'estudiante.nombreEstudiante',  
                'estudiante.primerApellido',
                'estudiante.segundoApellido',// Nombre del estudiante
                'tarea.textotarea',
                'notaSprint.nota',                        // Nota del estudiante
                'notaSprint.comentario'               // Comentario del docente (si existe)
            )
            ->where('notaSprint.idEmpresa' ,'=',$empresa)
            ->where('Sprint.numSprint','=',$semana)
            ->get();

        // Verificamos si hay datos
        if ($notasSprint->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron registros.'
            ], 404);
        }

        // Devolvemos los registros en formato JSON
        return response()->json($notasSprint, 200);
    }

    public function notasSprint($empresa)
    {
            
            $notasSprint = DB::table('notaSprint')
                ->join('estudiantesempresas', function($join) {
                    $join->on('notaSprint.idEmpresa', '=', 'estudiantesempresas.idEmpresa')
                        ->on('notaSprint.idEstudiante', '=', 'estudiantesempresas.idEstudiante');
                })
                ->join('estudiante', 'estudiantesempresas.idEstudiante', '=', 'estudiante.idEstudiante')
                ->join('sprint', 'sprint.idSprint', '=', 'notaSprint.idSprint')
                ->select(
                    'estudiante.idEstudiante',
                    'estudiante.nombreEstudiante',  
                    'estudiante.primerApellido',
                    'estudiante.segundoApellido', 
                    'sprint.idSprint',                // ID del sprint
                    'notaSprint.nota'                 // Nota del estudiante por sprint
                )
                ->where('notaSprint.idEmpresa', '=', $empresa)
                ->orderBy('estudiante.idEstudiante')
                ->orderBy('sprint.idSprint')
                ->get();

            // Verificamos si hay datos
            if ($notasSprint->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron registros.'
                ], 404);
            }

            // Procesamos los resultados para pivotar los datos
            $resultadosPivot = [];
            
            foreach ($notasSprint as $nota) {
                $nombreCompleto = $nota->nombreEstudiante . ' ' . $nota->primerApellido . ' ' . $nota->segundoApellido;
                
                // Si el estudiante aún no está en el array, lo agregamos
                if (!isset($resultadosPivot[$nota->idEstudiante])) {
                    $resultadosPivot[$nota->idEstudiante] = [
                        'nombre' => $nombreCompleto,
                        'sprints' => []
                    ];
                }

                // Agregamos la nota del sprint correspondiente
                $resultadosPivot[$nota->idEstudiante]['sprints']['Sprint ' . $nota->idSprint] = $nota->nota;
            }

            // Devolvemos el resultado pivotado en formato JSON
            return response()->json($resultadosPivot, 200);
        }
}