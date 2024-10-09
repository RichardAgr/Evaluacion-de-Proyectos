<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\EstudiantesGrupos;

class EstudianteController extends Controller
{
    public function asignarEstudianteAGrupo(Request $request)
    {
        // Validación de la solicitud
        $request->validate([
            'idEstudiante' => 'required|integer|exists:estudiante,idEstudiante',
            'idGrupo' => 'required|integer|exists:grupo,idGrupo',
        ]);

        // Verificar si la relación ya existe
        $existeRelacion = EstudiantesGrupos::where('idEstudiante', $request->idEstudiante)
                                            ->where('idGrupo', $request->idGrupo)
                                            ->exists();

        if ($existeRelacion) {
            return response()->json(['message' => 'Ya esta inscrito en un grupo.'], 400);
        }

        // Crear la nueva relación
        $estudiantesGrupo = new EstudiantesGrupos();
        $estudiantesGrupo->idEstudiante = $request->idEstudiante;
        $estudiantesGrupo->idGrupo = $request->idGrupo;
        $estudiantesGrupo->save();

        return response()->json(['message' => 'Estudiante asignado al grupo exitosamente.'], 201);
    }

}