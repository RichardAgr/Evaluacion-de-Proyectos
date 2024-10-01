<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;

class TareaController extends Controller
{
    // Método para recibir el idTarea y devolver los datos solicitados
    /*public function obtenerTarea($idTarea): JsonResponse
    {
        // Buscar la tarea por ID
        $tarea = Tarea::find($idTarea);

        if (!$tarea) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        // Recuperar datos relacionados (estudiantes y archivos de tarea)
        $estudiantes = Estudiante::where('idTarea', $idTarea)
                        ->get(['nombreEstudiante', 'primerApellido'])
                        ->toArray(); // Obtener los estudiantes como array

        $archivos = ArchivoTarea::where('idTarea', $idTarea)
                        ->get(['archivo'])
                        ->toArray(); // Obtener los archivos como array

        // Crear la estructura de la respuesta
        $response = [
            'idSemana' => $tarea->idSemana,
            'comentario' => $tarea->comentarioDocente,
            'textoTarea' => $tarea->textoTareaEstudiante,
            'fechaEntregado' => $tarea->fechaEntregado,
            'estudiantes' => $estudiantes,
            'archivosTarea' => $archivos
        ];

        // Devolver la respuesta en formato JSON
        return response()->json($response, 200);
    }*/
    /*public function obtenerTarea($idTarea)
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
            ->select('nombreEstudiante', 'primerApellido', 'segundoApellido') // Asumiendo que tienes la columna 'fotoEstudiante' en la tabla 'estudiante'
            ->where('tareasestudiantes.idTarea', $idTarea)
            ->get();

        // Obtener los archivos relacionados con la tarea
            $archivosTarea = DB::table('archivostarea')
            ->select('archivo')
            ->where('idTarea', $idTarea)
            ->get();
        
        // Convierte el resultado a un array
        $archivosArray = $archivosTarea->pluck('archivo')->toArray();


        // Formar la respuesta
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
}*/
    public function obtenerTarea($idTarea)
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

        // Obtener los archivos relacionados con la tarea, usando idTarea y fechaEntrega
        /*$archivosTarea = DB::table('archivostarea')
            ->join('tarea', function($join) use ($idTarea) {
                $join->on('archivostarea.idTarea', '=', 'tarea.idTarea');
                    //->on('archivostarea.fechaEntrega', '=', 'tarea.fechaEntrega');
            })
            ->select('archivostarea.archivo')
            ->where('tarea.idTarea', $idTarea)
            ->get();*/
            /*$archivosTarea = DB::table('archivostarea')
            ->join('tarea', function($join) use ($idTarea) {
                $join->on('archivostarea.idTarea', '=', 'tarea.idTarea')
                    ->whereRaw('DATE(archivostarea.fechaEntrega) = DATE(tarea.fechaEntrega)');
            })
            ->where('tarea.idTarea', $idTarea)
            ->select('archivostarea.archivo','archivostarea.nombreArchivo')
            ->get();


        // Convierte el resultado de archivos a un array
        $archivosArray = $archivosTarea->pluck('archivo','nombreArchivo')->toArray();*/

        //================= USANDO HASHMAP =============================
        /*
        $archivosTarea = DB::table('archivostarea')
        ->join('tarea', function($join) use ($idTarea) {
                $join->on('archivostarea.idTarea', '=', 'tarea.idTarea')
                    ->whereRaw('DATE(archivostarea.fechaEntrega) = DATE(tarea.fechaEntrega)');
            })
            ->where('tarea.idTarea', $idTarea)
            ->select('archivostarea.archivo', 'archivostarea.nombreArchivo')
            ->get();

            // Convierte el resultado de archivos a un array en el formato deseado
            $archivosArray = $archivosTarea->map(function($item) {
                return [
                    'nombre' => $item->nombreArchivo,
                    'archivo' => $item->archivo,
                ];
        })->toArray();
        */

        //===================================== UTILIZANDO FOREACH ==========================
        $archivosTarea = DB::table('archivostarea')
        ->join('tarea', function($join) use ($idTarea) {
            $join->on('archivostarea.idTarea', '=', 'tarea.idTarea')
                ->whereRaw('DATE(archivostarea.fechaEntrega) = DATE(tarea.fechaEntrega)');
        })
        ->where('tarea.idTarea', $idTarea)
        ->select('archivostarea.archivo', 'archivostarea.nombreArchivo')
        ->get();

    // Convierte el resultado de archivos a un array en el formato deseado
    $archivosArray = []; // Inicializa el array

    foreach ($archivosTarea as $item) {
        $archivosArray[] = [$item->nombreArchivo, $item->archivo]; // Añade un array con el nombre y el archivo
    }



        // Formar la respuesta
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