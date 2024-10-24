<?php

namespace App\Http\Controllers;
use App\Models\Docente;

use Illuminate\Http\Request;

class DocenteController extends Controller
{

    public function obtenerEmpresasPorDocente($idDocente)
    {
        $docente = Docente::find($idDocente);

        if (!$docente) {
            return response()->json(['error' => 'Docente no encontrado'], 404);
        }
        $empresas = $docente->empresas;
        //$id = session()->put('key', 'value');
        return response()->json([
            'docente' => $docente->nombreDocente,
            'empresas' => $empresas
        ], 200);
    }
}
