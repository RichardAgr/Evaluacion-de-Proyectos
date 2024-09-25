<?php
namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class EmpresaController extends Controller
{
    public function getEmpresaData($id)
    {
        // Obtener la empresa con el ID proporcionado
        $empresa = Empresa::with('estudiantes')->find($id);

        // Verificar si la empresa existe
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }

        // Formatear los datos
        $data = [
            'nombreEmpresa' => $empresa->nombreEmpresa,
            'nombreLargo' => $empresa->nombreLargo,
            'numeroDeFaltas' => $empresa->numerodefaltasempresa,
            'notaProductoFinal' => $empresa->notaproductofinal,
            'integrantes' => $empresa->estudiantes->map(function ($estudiante) {
                return [
                    'nombreEstudiante' => $estudiante->nombreEstudiante,
                    'primerApellido' => $estudiante->primerApellido,
                    'segundoApellido' => $estudiante->segundoApellido,
                    'rol' => $estudiante->rol,
                ];
            }),
        ];

        // Devolver los datos en formato JSON
        return response()->json($data);
    }
}
