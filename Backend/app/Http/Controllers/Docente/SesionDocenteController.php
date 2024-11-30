<?php
namespace App\Http\Controllers\Docente;
use App\Http\Controllers\Controller;
use App\Models\Estudiante;
use App\Models\Docente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SesionDocenteController extends Controller
{
    public function getGrupoSesion() {
        if ($idDocente = session('docente.id')) {
            $docente = Docente::find($idDocente);
            $nombreCompleto = trim("{$docente->nombreDocente} {$docente->primerApellido} {$docente->segundoApellido}");
            
            $grupo = DB::table('grupo as g')
                ->join('docente as d', 'g.idDocente', '=', 'd.idDocente')
                ->where('d.idDocente', $idDocente)
                ->whereRaw('CURDATE() >= g.fechaIniGestion')
                ->whereRaw('CURDATE() <= g.fechaFinGestion')
                ->select('g.idGrupo', 'g.fechaIniGestion', 'g.fechaLimiteEntregaEmpresa', 
                         'g.fechaLimiteEntregaPlanificacion', 'g.fechaFinPlanificacion', 'g.fechaFinGestion') 
                ->first();
    
            if ($grupo) {
                // Obtener el conteo de estudiantes en el grupo
                $numEstudiantes = DB::table('EstudiantesGrupos')
                    ->where('idGrupo', $grupo->idGrupo)
                    ->count();
    
                // Obtener el conteo de empresas relacionadas con los estudiantes del grupo
                $numEmpresas = DB::table('EstudiantesEmpresas')
                    ->join('EstudiantesGrupos', 'EstudiantesEmpresas.idEstudiante', '=', 'EstudiantesGrupos.idEstudiante')
                    ->where('EstudiantesGrupos.idGrupo', $grupo->idGrupo)
                    ->distinct('EstudiantesEmpresas.idEmpresa')
                    ->count('EstudiantesEmpresas.idEmpresa');
    
                return response()->json([
                    'idGrupo' => $grupo->idGrupo,
                    'fechaIniGestion' => $grupo->fechaIniGestion,
                    'fechaLimiteEntregaEmpresa' => $grupo->fechaLimiteEntregaEmpresa,
                    'fechaLimiteEntregaPlanificacion' => $grupo->fechaLimiteEntregaPlanificacion,
                    'fechaFinPlanificacion' => $grupo->fechaFinPlanificacion,
                    'fechaFinGestion' => $grupo->fechaFinGestion,
                    'nombreCompleto' => $nombreCompleto,
                    'numEstudiantes' => $numEstudiantes,
                    'numEmpresas' => $numEmpresas
                ], 200);
            } else {
                return response()->json(['idGrupo' => '-1'], 200);
            }
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }
    
}