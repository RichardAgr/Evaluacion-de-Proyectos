<?php

namespace App\Http\Controllers\Estudiante;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;
use App\Models\TareaEstudiante;
use App\Models\Semana;
use App\Models\Sprint;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
class TareaController extends Controller
{
    public function obtenerTarea($idTarea)
    {
        // Obtener la tarea
        $tarea = Tarea::find($idTarea);

        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        // Obtener los estudiantes de la tarea
        $estudiantes = DB::table('estudiante')
            ->join('tareasestudiantes', 'tareasestudiantes.idEstudiante', '=', 'estudiante.idEstudiante')
            ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido')
            ->where('tareasestudiantes.idTarea', $idTarea)
            ->get();

        // Obtener el primer estudiante relacionado con la tarea (esto sería uno de los estudiantes que ya se ha recuperado)
        $primerEstudiante = $estudiantes->first();

        if ($primerEstudiante) {
            // Obtener las empresas del primer estudiante
            $empresasEstudiante = DB::table('estudiantesempresas')
                ->where('idEstudiante', $primerEstudiante->idEstudiante)
                ->pluck('idEmpresa');

            // Obtener todos los estudiantes de las mismas empresas
            $companerosDeEmpresa = DB::table('estudiante')
                ->join('estudiantesempresas', 'estudiantesempresas.idEstudiante', '=', 'estudiante.idEstudiante')
                ->whereIn('estudiantesempresas.idEmpresa', $empresasEstudiante)
                ->where('estudiante.idEstudiante', '!=', $primerEstudiante->idEstudiante) // Excluir al primer estudiante
                ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido')
                ->get();
        }

        // Formar la respuesta
        $respuesta = [
            'idSemana' => $tarea->idSemana,
            'nombreTarea' => $tarea->nombreTarea,
            'comentario' => $tarea->comentario,
            'textotarea' => $tarea->textoTarea,
            'fechentregado' => $tarea->fechaEntrega,
            'estudiantes' => $estudiantes,
            'integrantes' => $companerosDeEmpresa ?? [],
        ];

        return response()->json($respuesta);
    }


    //************************************ POSTS*************************** */
    public function store(Request $request)
    {
        // Validar la entrada
        $request->validate([
            'idSemana' => 'required|integer',
            'textotarea' => 'required|string',
            'fechentregado' => 'required|date',
            'archivotarea' => 'nullable|array',
            'archivotarea.*' => 'file|mimes:pdf,zip,rar,7z', // Archivos permitidos
        ]);

        // Crear la tarea
        $tarea = Tarea::create([
            'idSemana' => $request->idSemana,
            'comentario' => '',
            'textoTarea' => $request->textotarea,
            'fechaEntrega' => $request->fechentregado,
            'notaTarea' => 0,
        ]);

        // Guardar los archivos en el disco y en la base de datos
        $archivosGuardados = [];
        if ($request->hasFile('archivotarea')) {
            foreach ($request->file('archivotarea') as $archivo) {
                $nombreArchivo = $archivo->getClientOriginalName();
                $rutaArchivo = $archivo->storeAs("public/uploads/{$tarea->idTarea}", $nombreArchivo);

                $archivoTarea = ArchivoTarea::create([
                    'idTarea' => $tarea->idTarea,
                    'archivo' => $rutaArchivo,
                    'nombreArchivo' => $nombreArchivo,
                    'fechaEntrega' => $request->fechentregado,
                ]);

                $archivosGuardados[] = $archivoTarea;
            }
        }

        return response()->json([
            'tarea' => $tarea,
            'archivos' => $archivosGuardados,
        ], 201);
    }

    public function update(Request $request, $idTarea)
    {
        try {
            // Validar los datos de entrada
            $request->validate([
                'textotarea' => 'required|string',
                'responsables' => 'nullable|array',
            ]);

            // Buscar la tarea
            $tarea = Tarea::find($idTarea);
            if (!$tarea) {
                return response()->json(['error' => 'Tarea no encontrada'], 404);
            }

            // Actualizar la descripción de la tarea
            $tarea->textoTarea = $request->input('textotarea');
            $tarea->save();


            // Eliminar responsables actuales de la tarea
            TareaEstudiante::where('idTarea', $idTarea)->delete();

            // Agregar responsables
            if ($request->has('responsables')) {
                foreach ($request->input('responsables') as $responsable) {
                    TareaEstudiante::create([
                        'idTarea' => $idTarea,
                        'idEstudiante' => $responsable['idEstudiante'],
                    ]);
                }
            }

            return response()->json(['message' => 'Tarea actualizada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearTarea(Request $request)
    {
        $sprint = $request->input('sprint');
        $semana = $request->input('semana');
        $nombreTarea = $request->input('nombreTarea');

        $resultado = DB::table('tarea as t');
        // ->join('semana as s','s.idSemana',)
    }

    public function getTareasSemana($idEmpresa, $idSprint, $idSemana)
    {
        try {
            // Realizar una única consulta uniendo las tablas necesarias
            $tareas = Tarea::join('semana as s', 'tarea.idSemana', '=', 's.idSemana')
                ->join('sprint as sp', 's.idSprint', '=', 'sp.idSprint')
                ->join('planificacion as p', 'sp.idPlanificacion', '=', 'p.idPlanificacion')
                ->join('empresa as emp', 'emp.idEmpresa', '=', 'p.idEmpresa')
                ->where('emp.idEmpresa', $idEmpresa)
                ->where('sp.numeroSprint', $idSprint)
                ->where('s.numeroSemana', $idSemana)
                ->select('tarea.*', 's.numeroSemana', 'sp.numeroSprint')
                ->get();
    
            // Obtener el número de semana y número de sprint directamente de la consulta
            $numeroSemana = $idSemana;
            $numeroSprint = $idSprint;
    
            return response()->json([
                'numeroSemana' => $numeroSemana,
                'numeroSprint' => $numeroSprint,
                'tareas' => $tareas,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las tareas: ' . $e->getMessage()], 500);
        }
    }
    

    // Actualizar las tareas de una semana específica
    public function updateTareasSemana(Request $request, $idEmpresa, $idSprint, $idSemana)
    {
        try {
            $tareas = $request->input('tareas');

            foreach ($tareas as $tareaData) {
                if (isset($tareaData['idTarea']) && !empty($tareaData['deleted'])) {
                    // Eliminar tarea
                    Tarea::where('idTarea', $tareaData['idTarea'])->delete();
                } elseif (isset($tareaData['idTarea'])) {
                    // Actualizar tarea existente
                    Tarea::where('idTarea', $tareaData['idTarea'])->update([
                        'nombreTarea' => $tareaData['nombreTarea'],
                        'comentario' => $tareaData['comentario'] ?? '',
                        'fechaEntrega' => $tareaData['fechaEntrega'] ?? null,
                    ]);
                } else {
                    // Crear nueva tarea si no tiene idTarea
                    Tarea::create([
                        'idSemana' => $idSemana,
                        'nombreTarea' => $tareaData['nombreTarea'],
                        'textoTarea' => '',
                        'comentario' => $tareaData['comentario'] ?? '',
                        'fechaEntrega' => $tareaData['fechaEntrega'] ?? Carbon::now(),
                    ]);
                }
            }

            return response()->json(['message' => 'Tareas actualizadas correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar las tareas: ' . $e->getMessage()], 500);
        }
    }
}
