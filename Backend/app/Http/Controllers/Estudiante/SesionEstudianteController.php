<?php
namespace App\Http\Controllers\Estudiante;
use App\Http\Controllers\Controller;
use App\Models\Estudiante;
use App\Models\Docente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SesionEstudianteController extends Controller
{
    public function getEmpresaSesion() {
        if ($idEstudiante = session('estudiante.id')) {
            $empresa = DB::table('empresa as e')
                ->join('estudiantesempresas as ep', 'e.idEmpresa', '=', 'ep.idEmpresa')
                ->where('ep.idEstudiante', $idEstudiante)
                ->select('e.idEmpresa')
                ->first();
            if ($empresa) {
                return response()->json(['idEmpresa' => $empresa->idEmpresa], 200);
            }
            return response()->json(['idEmpresa' => '-1'], 200);
        }
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }

    public function getGrupoSesion() {
        if ($idEstudiante = session('estudiante.id')) {
            $grupo = DB::table('grupo as g')
                ->join('estudiantesgrupos as eg', 'g.idGrupo', '=', 'eg.idGrupo')
                ->where('eg.idEstudiante', $idEstudiante)
                ->select('g.idGrupo') // Seleccionar solo el campo necesario
                ->first();
            if ($grupo) {
                return response()->json(['idGrupo' => $grupo->idGrupo], 200);
            }
            return response()->json(['idGrupo' => '-1'], 200);
        }
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }
}