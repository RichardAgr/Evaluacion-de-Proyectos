<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\EstudiantesGrupos;
use App\Models\Grupo;

class EstudianteController extends Controller
{
    public function asignarEstudianteAGrupo(Request $request)
    {
        // Validación de la solicitud
        $request->validate([
            'idEstudiante' => 'required|integer|exists:estudiante,idEstudiante',
            'idGrupo' => 'required|integer|exists:grupo,idGrupo',
            'codigoAcceso' => 'required|string'
        ]);

        // Verificar si la relación ya existe
        $existeRelacion = EstudiantesGrupos::where('idEstudiante', $request->idEstudiante)
                                            //->where('idGrupo', $request->idGrupo)
                                            ->exists();

        if ($existeRelacion) {
            return response()->json(['message' => 'Ya esta inscrito en un grupo.'], 400);
        }
        $passwordCorrecta = Grupo::where('codigoAcceso',$request -> codigoAcceso)
                                            ->where('idGrupo', $request->idGrupo)
                                            ->exists();
        if($passwordCorrecta){
            // Crear la nueva relación
            $estudiantesGrupo = new EstudiantesGrupos();
            $estudiantesGrupo->idEstudiante = $request->idEstudiante;
            $estudiantesGrupo->idGrupo = $request->idGrupo;
            $estudiantesGrupo->save();
            return response()->json(['message' => 'Estudiante asignado al grupo exitosamente.'], status: 201);
        }else{
            return response()->json(['message' => 'Password Incorrecta.'], status: 200 );
        }

    }

}