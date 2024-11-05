<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Estudiante;
use App\Models\Semana;
use App\Models\Tarea;
use App\Models\NotaSprint;
use Illuminate\Support\Facades\DB;


class joaquinController extends Controller{

    public function crearEmpresa(Request $request)
    {
        // Validación de los datos
        $request->validate([
            'nombreLargo'   => 'required|string|max:255',
            'nombreCorto'   => 'required|string|max:255',
            'estudiante'    => 'required|integer|exists:estudiante,idEstudiante', 
        ]);
    
        // Verificar si el estudiante ya está asociado a otra empresa
        $estudiante = Estudiante::find($request->estudiante);
        if ($estudiante->estudiantesEmpresas()->exists()) { 
            return response()->json([
                'message' => 'El estudiante ya está asociado a otra empresa'
            ], 400);
        }
    
        // Crear la empresa
        $empresa = Empresa::create([
            'nombreLargo'    => $request->nombreLargo,
            'nombreEmpresa'  => $request->nombreCorto,
        ]);
    
        // Asociar el estudiante a la nueva empresa
        $empresa->estudiantes()->attach($request->estudiante);
    
        // Actualizar el campo 'disponible' del estudiante
        $estudiante->disponible = '1'; 
        $estudiante->save();
    
        return response()->json([
            'message' => 'Empresa creada con éxito',
            'empresa' => $empresa
        ], 201);
    }

    public function getEstudiante($id)
    {
        try {
            $estudiante = Estudiante::find($id);
    
            if (!$estudiante) {
                return response()->json([
                    'error' => 'Estudiante no encontrado'
                ], 404);
            }
    
            return response()->json($estudiante->only(['idEstudiante', 'nombreCuenta', 'nombreEstudiante', 'primerApellido', 'segundoApellido']), 200);
        } catch (\Exception $e) {
            // Captura errores inesperados y retorna un mensaje de error
            return response()->json([
                'error' => 'Ocurrió un error al recuperar el estudiante'
            ], 500);
        }
    }

    public function notaSprintV2($empresa, $semana)
    {   
        // $empresa = $request->input('empresa');
        // $semana = $request->input('numeroSprint');
    
        $resultado = DB::table('estudiantesempresas as ep')
            ->join('estudiante as e', 'ep.idEstudiante', '=', 'e.idEstudiante')
            ->leftJoin('planificacion as p', function($join) use ($empresa) {
                $join->on('p.idEmpresa', '=', 'ep.idEmpresa')
                     ->where('p.idEmpresa', '=', $empresa);
            })
            ->leftJoin('sprint as sp', function($join) use ($semana) {
                $join->on('sp.idPlanificacion', '=', 'p.idPlanificacion')
                     ->where('sp.numeroSprint', '=', $semana);
            })
            ->leftJoin('semana as s', 'sp.idSprint', '=', 's.idSprint')
            ->leftJoin('tarea as t', 't.idSemana', '=', 's.idSemana')
            ->leftJoin('notasprint as np', function($join) {
                $join->on('np.idSprint', '=', 'sp.idSprint')
                     ->on('np.idEstudiante', '=', 'ep.idEstudiante');
            })
            ->leftJoin('tareasestudiantes as te', function($join) {
                $join->on('te.idTarea', '=', 't.idTarea')
                     ->on('te.idEstudiante', '=', 'ep.idEstudiante');
            })
            ->select('t.nombreTarea', 
                     DB::raw("CONCAT(e.nombreEstudiante, ' ', e.primerApellido, ' ', e.segundoApellido) as nombre_completo"),
                     'np.nota', 
                     'np.comentario',
                     'e.idEstudiante'
            )
            ->where('ep.idEmpresa', $empresa)
            ->get();
    
        // Agrupar los resultados por estudiante
        $resultadoAgrupado = $resultado->groupBy('nombre_completo')->map(function($items) {
            return [
                'tareas' => $items->pluck('nombreTarea')->filter()->toArray(),  // Filtrar tareas nulas
                'nota' => $items->first()->nota,
                'comentario' => $items->first()->comentario,
                'id' => $items->first()->idEstudiante
            ];
        });
    
        return $resultadoAgrupado;
    }
    
    


}