<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;

class TareaController extends Controller
{
    // Método para recibir el idTarea y devolver los datos solicitados
    public function obtenerTarea($idTarea): JsonResponse
    {
        // Buscar la tarea por ID
        $tarea = Tarea::find($idTarea);

        if (!$tarea) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        // Recuperar datos relacionados (estudiantes y archivos de tarea)
        $estudiantes = Estudiante::where('idTarea', $idTarea)
                        ->get(['nombre', 'apellido', 'foto'])
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
    }
}
