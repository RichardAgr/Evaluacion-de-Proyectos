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
                ->whereRaw('CURDATE() >= g.fechaIniGestion') // Usamos whereRaw para CURDATE()
                ->whereRaw('CURDATE() <= g.fechaFinGestion') // Usamos whereRaw para CURDATE()
                ->select('g.idGrupo') 
                ->first(); 
            if ($grupo) {
                return response()->json([
                    'idGrupo' => $grupo->idGrupo,
                    'idDocente' => $idDocente,
                    'nombreCompleto' => $nombreCompleto
                ], 200);
            }else {
            return response()->json(['idGrupo' => '-1'], 200);}
        }else{
        return response()->json(['error' => 'Usuario no encontrado'], 404);}
    }
}