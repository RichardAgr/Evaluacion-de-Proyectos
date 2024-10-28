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
        $semana = $request->input('numeroSprint');
    
        // Realizar la consulta con joins para unir las tablas estudiante, estudiantesempresas y notasSprint
        $notasSprint = DB::table('estudiantesempresas')
            ->leftJoin('notaSprint', function($join) use ($empresa) { // Usamos 'use' para pasar la variable
                $join->on('estudiantesempresas.idEstudiante', '=', 'notaSprint.idEstudiante')
                     ->where('notaSprint.idEmpresa', '=', $empresa);
            })
            ->leftJoin('estudiante', 'estudiantesempresas.idEstudiante', '=', 'estudiante.idEstudiante')
            ->leftJoin('tareasestudiantes', 'estudiante.idEstudiante', '=', 'tareasestudiantes.idEstudiante')
            ->leftJoin('tarea', 'tarea.idTarea', '=', 'tareasestudiantes.idTarea')
            ->leftJoin('sprint', 'sprint.idSprint', '=', 'notaSprint.idSprint')
            ->select(
                'estudiante.idEstudiante',
                'estudiante.nombreEstudiante',  
                'estudiante.primerApellido',
                'estudiante.segundoApellido',
                'notaSprint.nota',
                'notaSprint.comentario', 
                'tarea.nombreTarea'
            )
            ->where('estudiantesempresas.idEmpresa', '=', $empresa)
            ->where('sprint.numeroSprint', '=', $semana)
            ->get();
    
        // Verificamos si hay datos
        if ($notasSprint->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron registros.'
            ], 404);
        }
    
        // Transformar los resultados para agrupar las tareas en un array
        $resultadosAgrupados = $notasSprint->groupBy(function($item) {
            return $item->idEstudiante; // Agrupar por idEstudiante
        })->map(function($grupo) {
            return [
                'idEstudiante' => $grupo[0]->idEstudiante,
                'nombreEstudiante' => $grupo[0]->nombreEstudiante,
                'primerApellido' => $grupo[0]->primerApellido,
                'segundoApellido' => $grupo[0]->segundoApellido,
                'nota' => $grupo[0]->nota,
                'comentario' => $grupo[0]->comentario,
                'tareas' => $grupo->pluck('nombreTarea')->unique()->values() // Acumula las tareas en un array y elimina duplicados
            ];
        })->values(); // Opcional: reindexar el array para tener índices numéricos
    
        // Devolvemos los registros en formato JSON
        return response()->json($resultadosAgrupados, 200);
    }
    
    
    
    public function actualizarNotaSprint(Request $request)
{
    $request->validate([
        'idEstudiante' => 'required|exists:estudiante,idEstudiante',
        'idSprint' => 'required|exists:sprint,idSprint',
        'idEmpresa' => 'required|exists:empresa,idEmpresa',
        'nota' => 'required|numeric',
        'comentario' => 'nullable|string',
    ]);

    // Actualiza la nota y el comentario
    $actualizado = DB::table('notaSprint')
        ->where('idEstudiante', $request->input('idEstudiante'))
        ->where('idSprint', $request->input('idSprint'))
        ->where('idEmpresa', $request->input('idEmpresa'))
        ->update([
            'nota' => $request->input('nota'),
            'comentario' => $request->input('comentario'),
        ]);

    if ($actualizado) {
        return response()->json(['message' => 'Nota y comentario actualizados correctamente.'], 200);
    } else {
        return response()->json(['message' => 'No se pudo actualizar.'], 500);
    }
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