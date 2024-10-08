<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;

class TareasController extends Controller
{
    public function obtenerTarea2($idTarea)
    {
        // Obtener la tarea específica
        $tarea = DB::table('tarea')
            ->select('idSemana', 'comentario', 'textoTarea', 'fechaEntrega')
            ->where('idTarea', $idTarea)
            ->first();

        // Si no se encuentra la tarea, devolver un error
        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }

        // Obtener los estudiantes relacionados con la tarea
        $estudiantes = DB::table('estudiante')
            ->join('tareasestudiantes', 'tareasestudiantes.idEstudiante', '=', 'estudiante.idEstudiante')
            ->join('fotoestudiante', 'fotoestudiante.idEstudiante', '=', 'estudiante.idEstudiante')
            ->select('estudiante.idEstudiante','nombreEstudiante', 'primerApellido', 'segundoApellido','fotoestudiante.foto') // Puedes agregar 'fotoEstudiante' si está disponible
            ->where('tareasestudiantes.idTarea', $idTarea)
            ->get();
        //===================================== UTILIZANDO FOREACH ==========================
        $archivosTarea = DB::table('archivostarea')
        ->join('tarea', function($join) use ($idTarea) {
            $join->on('archivostarea.idTarea', '=', 'tarea.idTarea')
                ->whereRaw('DATE(archivostarea.fechaEntrega) = DATE(tarea.fechaEntrega)');
        })
        ->where('tarea.idTarea', $idTarea)
        ->select('archivostarea.archivo', 'archivostarea.nombreArchivo')
        ->get();
    $archivosArray = [];

    foreach ($archivosTarea as $item) {
        $archivosArray[] = [$item->nombreArchivo, $item->archivo]; // Añade un array con el nombre y el archivo
    }
        $respuesta = [
            'idSemana' => $tarea->idSemana,
            'comentario' => $tarea->comentario,
            'textotarea' => $tarea->textoTarea,
            'fechentregado' => $tarea->fechaEntrega,
            'estudiantes' => $estudiantes,
            'archivotarea' => $archivosArray,
        ];

        return response()->json($respuesta);
    }

}