<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Tarea;
use App\Models\Estudiante;
use App\Models\ArchivoTarea;
use App\Models\TareaEstudiante;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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

    // Obtener archivos de la tarea
    $archivosTarea = ArchivoTarea::where('idTarea', $idTarea)
        ->select('idArchivo', 'archivo', 'nombreArchivo')
        ->get();
    Log::info('Archivos de tarea:', $archivosTarea->toArray());

    // Formar la respuesta
    $respuesta = [
        'idSemana' => $tarea->idSemana,
        'nombreTarea' => $tarea->nombreTarea,
        'comentario' => $tarea->comentario,
        'textotarea' => $tarea->textoTarea,
        'fechentregado' => $tarea->fechaEntrega,
        'estudiantes' => $estudiantes,
        'archivotarea' => $archivosTarea->map(function ($archivo) {
            // Decodificar el archivo Base64
            $contenidoArchivo = base64_decode($archivo->archivo);
            // Guardar el archivo en el sistema de almacenamiento
            $rutaArchivo = 'public/archivos/' . $archivo->nombreArchivo; // Asegúrate de que esté en 'public/archivos'


            Storage::put($rutaArchivo, $contenidoArchivo); // Guardar el archivo

            // Generar la URL del archivo guardado
            return [
                'idArchivo' => $archivo->idArchivo,
                'archivo' => url(Storage::url($rutaArchivo)),  // Generar la URL completa
                'nombreArchivo' => $archivo->nombreArchivo
            ];
        }),
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
                'files' => 'nullable|array',
                'files.*.file' => 'file|mimes:pdf,zip,rar,7z,txt,png,jpg,jpeg,doc,docx,xls,xlsx|max:2048',
                'deletedFiles' => 'nullable|array',
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

            // Eliminar archivos en deletedFiles
            if ($request->has('deletedFiles')) {
                foreach ($request->input('deletedFiles') as $idArchivo) {
                    if ($idArchivo != -1) {
                        $archivoTarea = ArchivoTarea::find($idArchivo);
                        if ($archivoTarea && $archivoTarea->idTarea == $idTarea) {
                            $archivoTarea->delete();
                        }
                    }
                }
            }

            // Eliminar responsables actuales de la tarea
            TareaEstudiante::where('idTarea', $idTarea)->delete();

            // Procesar y guardar archivos nuevos
            if ($request->has('files')) {
                foreach ($request->input('files') as $fileData) {
                    if ($fileData['idArchivo'] === "-1" && isset($fileData['url'])) {
                        // Convertir la URL a base64
                        $fileContent = file_get_contents($fileData['url']);
                        $base64File = base64_encode($fileContent);
                        $nombreArchivo = $fileData['name'];

                        // Guardar el archivo en la base de datos
                        ArchivoTarea::create([
                            'idTarea' => $idTarea,
                            'archivo' => $base64File, // Guardar el contenido base64
                            'fechaEntrega' => now(),
                            'nombreArchivo' => $nombreArchivo
                        ]);
                    }
                }
            }

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
}
