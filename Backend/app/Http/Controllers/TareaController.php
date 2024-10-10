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
  

    /* Metodos GET*/
    public function obtenerTarea($idTarea)
    {
        // Obtener la tarea específica
        $tarea = DB::table('tarea')
            ->select('idSemana', 'comentario', 'textoTarea', 'fechaEntrega','notaTarea')
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
            'fechaentregado' => $tarea->fechaEntrega,
            'notatarea' => $tarea->notaTarea,
            'estudiantes' => $estudiantes,
            'archivotarea' => $archivosArray,
        ];

        return response()->json($respuesta);
    }

    /* Metodos POST */
    public function calificarTarea(Request $request, $idTarea)
    {
 
        $tarea = Tarea::find($idTarea);
    
        
        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }
    
    
        $tarea->comentario = $request->comentario_docente;
        $tarea->notaTarea = $request->nota; 
    
        $tarea->save();
    
        return response()->json(['message' => 'Tarea calificada con éxito', 'tarea' => $tarea]);
    }
    
}
