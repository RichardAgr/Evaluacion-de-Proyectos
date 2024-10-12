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
    public function obtenerTarea($idTarea)
    {
 
        $tarea = Tarea::find($idTarea);
    
        
        if (!$tarea) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        }
        //Obtener estudiantes de la tarea
        $estudiantes = DB::table('estudiante')
            ->join('tareasestudiantes', 'tareasestudiantes.idEstudiante', '=', 'estudiante.idEstudiante')
            ->join('fotoestudiante', 'fotoestudiante.idEstudiante', '=', 'estudiante.idEstudiante')
            ->select('estudiante.idEstudiante','nombreEstudiante', 'primerApellido', 'segundoApellido','fotoestudiante.foto') // Puedes agregar 'fotoEstudiante' si está disponible
            ->where('tareasestudiantes.idTarea', $idTarea)
            ->get();
        //Obtener archivos de la tarea
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
//************************************ POSTS*************************** */
public function store(Request $request)
{
    // Validar la entrada
    $request->validate([
        'idSemana' => 'required|integer',
        'textotarea' => 'required|string',
        'fechentregado' => 'required|date',
        'idTarea' => 'required|integer', // Agregar la validación para idTarea
        'archivotarea' => 'required|array',
        'archivotarea.*.archivo' => 'required|string',
        'archivotarea.*.nombre' => 'required|string',
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
    foreach ($request->archivotarea as $archivoData) {
        $archivoBase64 = $archivoData['archivo'];
        $nombreArchivo = $archivoData['nombre'];

        $extension = pathinfo($nombreArchivo, PATHINFO_EXTENSION);
        $nombreArchivoGuardado = uniqid() . '.' . $extension;
        $path = storage_path('app/uploads/' . $nombreArchivoGuardado);
        file_put_contents($path, base64_decode($archivoBase64));

        $archivoTarea = ArchivoTarea::create([
            'idTarea' => $request->idTarea, // Usar el idTarea del request
            'archivo' => $nombreArchivoGuardado,
            'nombreArchivo' => $nombreArchivo,
            'fechaEntrega' => $request->fechentregado,
        ]);

        $archivosGuardados[] = $archivoTarea;
    }

    return response()->json([
        'tarea' => $tarea,
        'archivos' => $archivosGuardados,
    ], 201);
}

        
}