<?php
//ESTA ES LA EVALUACION SEMANAL
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
use PhpParser\Node\Expr\AssignOp\Concat;

class NotaSprintController extends Controller{

    //Obtiene las notas por estudiante y sprint
    public function notaSprint(Request $request)
    {   
        $empresa = $request->input('empresa');
        $semana = $request->input('numeroSprint');
    
        $resultado = DB::table('tarea as t')
            ->join('semana as s', 't.idSemana', '=', 's.idSemana')
            ->join('sprint as sp', 's.idSprint', '=', 'sp.idSprint')
            ->join('notasprint as np', 'np.idSprint', '=', 'sp.idSprint')
            ->join('estudiantesempresas as ep', function($join) {
                $join->on('np.idEstudiante', '=', 'ep.idEstudiante')
                     ->on('np.idEmpresa', '=', 'ep.idEmpresa');
            })
            ->join('estudiante as e', 'ep.idEstudiante', '=', 'e.idEstudiante')
            ->join('planificacion as p', function($join) use ($empresa) {
                $join->on('p.idPlanificacion', '=', 'sp.idPlanificacion')
                     ->where('p.idEmpresa', '=', $empresa);
            })
            ->join('tareasestudiantes as te', function($join) {
                $join->on('te.idTarea', '=', 't.idTarea')
                     ->on('e.idEstudiante', '=', 'te.idEstudiante');
            })
            ->select('t.nombreTarea', DB::raw("CONCAT(e.nombreEstudiante, ' ', e.primerApellido, ' ', e.segundoApellido) as nombre_completo"),'np.nota', 'np.comentario','e.idEstudiante')
            ->where('ep.idEmpresa', $empresa)
            ->where('sp.numeroSprint', $semana)
            ->get();
    
        // Agrupar los resultados por estudiante
        $resultadoAgrupado = $resultado->groupBy('nombre_completo')->map(function($items) {
            return [
                'tareas' => $items->pluck('nombreTarea')->toArray(),
                'nota' => $items->first()->nota,
                'comentario' => $items->first()->comentario,
                'id' => $items->first()->idEstudiante
            ];
        });
    
        return response()->json($resultadoAgrupado);
    }
    

//Obtiene las notas por sprint de la empresa
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
                    'sprint.numeroSprint',                // ID del sprint
                    'notaSprint.nota'                 // Nota del estudiante por sprint
                )
                ->where('notaSprint.idEmpresa', '=', $empresa)
                ->orderBy('estudiante.idEstudiante')
                ->orderBy('sprint.numeroSprint')
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
                $resultadosPivot[$nota->idEstudiante]['sprints']['Sprint ' . $nota->numeroSprint] = $nota->nota;
            }

            // Devolvemos el resultado pivotado en formato JSON
            return response()->json($resultadosPivot, 200);
        }

//obtiene las las tareas y los nombres (Para la evaluazcion)
public function obtenerTareaYEstudiante(Request $request){
    $empresa = $request->input('empresa');
    $semana = $request->input('numeroSprint');
    $resultado = DB::table('tarea as t')
            ->join('semana as s', 't.idSemana', '=', 's.idSemana')
            ->join('sprint as sp', 's.idSprint', '=', 'sp.idSprint')
            ->join('notasprint as np', 'np.idSprint', '=', 'sp.idSprint')
            ->join('estudiantesempresas as ep', function($join) {
                $join->on('np.idEstudiante', '=', 'ep.idEstudiante')
                     ->on('np.idEmpresa', '=', 'ep.idEmpresa');
            })
            ->join('estudiante as e', 'ep.idEstudiante', '=', 'e.idEstudiante')
            ->join('planificacion as p', function($join) use ($empresa) {
                $join->on('p.idPlanificacion', '=', 'sp.idPlanificacion')
                     ->where('p.idEmpresa', '=', $empresa);
            })
            ->select('t.nombreTarea', DB::raw("CONCAT(e.nombreEstudiante, ' ', e.primerApellido, ' ', e.segundoApellido) as nombre_completo"),'e.idEstudiante')
            ->where('ep.idEmpresa', $empresa)
            ->where('sp.numeroSprint', $semana)
            ->get();
    
        // Agrupar los resultados por estudiante
        $resultadoAgrupado = $resultado->groupBy('nombre_completo')->map(function($items) {
            return [
                'tareas' => $items->pluck('nombreTarea')->toArray(),
                'id' => $items->first()->idEstudiante
            ];
        });
    
        return response()->json($resultadoAgrupado);
}

public function realizarEvaluacionSemana(Request $request) {
        $empresa = $request->input('empresa');
        $numeroSprint = $request->input('numeroSprint');
        $notas = $request->input('notas');
        $estudiantes = $request->input('estudiantes');
        $comentarios = $request->input('comentarios');
    
        // Obtener el idPlanificacion asociado a la empresa
        $idPlanificacion = DB::table('planificacion')
            ->where('idEmpresa', $empresa)
            ->value('idPlanificacion');
    
        if (!$idPlanificacion) {
            return response()->json(['error' => 'No se encontró planificación para esta empresa'], 404);
        }
    
        // Obtener el idSprint usando el idPlanificacion y numeroSprint
        $idSprint = DB::table('sprint')
            ->where('idPlanificacion', $idPlanificacion)
            ->where('numeroSprint', $numeroSprint)
            ->value('idSprint');
    
        if (!$idSprint) {
            return response()->json(['error' => 'No se encontró sprint para el número especificado'], 404);
        }
    
        $dataToInsert = [];
    
        foreach ($estudiantes as $index => $idEstudiante) {
            $dataToInsert[] = [
                'idSprint' => $idSprint,
                'idEstudiante' => $idEstudiante,
                'idEmpresa' => $empresa,
                'nota' => $notas[$index],
                'comentario' => $comentarios[$index]
            ];
        }
    
        // Insertar todos los registros en notaSprint
        DB::table('notaSprint')->insert($dataToInsert);
    
        return response()->json(['message' => 'Evaluación registrada exitosamente']);
    }  
}