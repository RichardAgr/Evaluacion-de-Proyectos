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
                'estudiante.nombreEstudiante',  
                'estudiante.primerApellido',
                'estudiante.segundoApellido',// Nombre del estudiante
                'tarea.textotarea',
                'notaSprint.nota',                        // Nota del estudiante
                'notaSprint.comentarioDocente'               // Comentario del docente (si existe)
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

}