<?php

namespace App\Http\Controllers\Estudiante;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;
use App\Models\TareaEstudiante;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
class TareaController extends Controller
{
    public function obtenerTarea($idTarea)
{
    $tarea = Tarea::find($idTarea);

    if (!$tarea) {
        return response()->json(['error' => 'Tarea no encontrada'], 404);
    }

    // Obtener estudiantes de la tarea
    $estudiantes = DB::table('estudiante')
        ->join('tareasestudiantes', 'tareasestudiantes.idEstudiante', '=', 'estudiante.idEstudiante')
        ->select('estudiante.idEstudiante', 'nombreEstudiante', 'primerApellido', 'segundoApellido')
        ->where('tareasestudiantes.idTarea', $idTarea)
        ->get();


    // Formar la respuesta
    $respuesta = [
        'idSemana' => $tarea->idSemana,
        'nombreTarea' => $tarea->nombreTarea,
        'comentario' => $tarea->comentario,
        'textotarea' => $tarea->textoTarea,
        'fechentregado' => $tarea->fechaEntrega,
        'estudiantes' => $estudiantes
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

    public function crearTarea(Request $request){
        $sprint = $request->input('sprint');
        $semana = $request->input('semana');
        $nombreTarea = $request->input('nombreTarea');

        $resultado = DB::table('tarea as t');
       // ->join('semana as s','s.idSemana',)
    }
}
