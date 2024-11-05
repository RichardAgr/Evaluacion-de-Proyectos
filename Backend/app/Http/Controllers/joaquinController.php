<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Estudiante;


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

    
    


}