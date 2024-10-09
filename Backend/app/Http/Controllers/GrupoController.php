<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GrupoController extends Controller
{
    public function obtenerTodosLosGrupos()
    {
        // Consulta para obtener los datos de todos los grupos y los docentes asociados
        $gruposDocentes = DB::table('grupo')
            ->join('docente', 'grupo.idDocente', '=', 'docente.idDocente')
            ->select(
                'grupo.numGrupo', 
                'docente.nombreDocente as nombre', 
                'docente.primerApellido as apellidoPaterno', 
                'docente.segundoApellido as apellidoMaterno', 
                'grupo.gestionGrupo'
            )
            ->get();

        // Si no se encuentran resultados
        if ($gruposDocentes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron grupos.'], 404);
        }

        return response()->json($gruposDocentes, 200);
    }

    public function obtenerEstudiantesYDocentePorGrupo($idGrupo)
    {
        // Consulta para obtener todos los estudiantes y el docente del grupo
        $datosGrupo = DB::table('estudiantesgrupos')
            ->join('grupo', 'estudiantesgrupos.idGrupo', '=', 'grupo.idGrupo')
            ->join('estudiante', 'estudiantesgrupos.idEstudiante', '=', 'estudiante.idEstudiante')
            ->join('docente', 'grupo.idDocente', '=', 'docente.idDocente')
            ->where('grupo.idGrupo', $idGrupo)
            ->select(
                'grupo.numGrupo', 
                'grupo.gestionGrupo',
                'estudiante.nombreEstudiante as nombreEstudiante', 
                'estudiante.primerApellido as apellidoPaternoEstudiante', 
                'estudiante.segundoApellido as apellidoMaternoEstudiante',
                'docente.nombreDocente as nombreDocente', 
                'docente.primerApellido as apellidoPaternoDocente', 
                'docente.segundoApellido as apellidoMaternoDocente'
            )
            ->get();

        // Si no se encuentran resultados
        if ($datosGrupo->isEmpty()) {
            return response()->json(['message' => 'No se encontraron estudiantes o docentes para este grupo.'], 404);
        }

        return response()->json($datosGrupo, 200);
    }

    
}
