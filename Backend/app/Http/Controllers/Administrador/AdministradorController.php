<?php
namespace App\Http\Controllers\Administrador;

use App\Models\Estudiante;
use App\Models\Docente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Administrador;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdministradorController extends Controller{

    public function crearEstudiante(Request $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'nombreCuenta' => 'required|string',
                'nombreEstudiante' => 'required|string',
                'primerApellido' => 'required|string',
                'segundoApellido' => 'required|string',
                'contrasena' => 'required|string',
                'contrasenaRepetida' => 'required|string',
                'email' => 'required|string',
            ]);
            if (DB::table('estudiante')->where('nombreCuenta', $validated['nombreCuenta'])->exists()) {
                return response()->json(['error' => 'El nombre de cuenta ya existe.'], 400);
            }
            if (DB::table('estudiante')->where('email', $validated['email'])->exists()) {
                return response()->json(['error' => 'El correo electrónico ya está registrado.'], 400);
            }
            if($validated['contrasena'] !== $validated['contrasenaRepetida']){
                return response()->json(['error' => 'La contraseña no es igual.'], 400);
            }
            DB::table('estudiante')->insert([
                'nombreCuenta' => $validated['nombreCuenta'],
                'nombreEstudiante' => $validated['nombreEstudiante'],
                'primerApellido' => $validated['primerApellido'],
                'segundoApellido' => $validated['segundoApellido'],
                'contrasena' => Hash::make($validated['contrasena']), 
                'email' => $validated['email'],
            ]);
            DB::commit();
            return response()->json(['message' => 'Estudiante registrado exitosamente.'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ocurrió un error al registrar el estudiante.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function crearDocente(Request $request) {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'nombreCuenta' => 'required|string',
                'nombreDocente' => 'required|string',
                'primerApellido' => 'required|string',
                'segundoApellido' => 'required|string',
                'contrasena' => 'required|string',
                'contrasenaRepetida' => 'required|string',
                'email' => 'required|string|email',
            ]);
            if (DB::table('docente')->where('nombreCuenta', $validated['nombreCuenta'])->exists()) {
                return response()->json(['error' => 'El nombre de cuenta ya existe.'], 400);
            }
            if (DB::table('docente')->where('email', $validated['email'])->exists()) {
                return response()->json(['error' => 'El correo electrónico ya está registrado.'], 400);
            }
            if ($validated['contrasena'] !== $validated['contrasenaRepetida']) {
                return response()->json(['error' => 'La contraseña no es igual.'], 400);
            }
            DB::table('docente')->insert([
                'nombreCuenta' => $validated['nombreCuenta'],
                'nombreDocente' => $validated['nombreDocente'],
                'primerApellido' => $validated['primerApellido'],
                'segundoApellido' => $validated['segundoApellido'],
                'contrasena' => Hash::make($validated['contrasena']),
                'email' => $validated['email'],
            ]);
    
            DB::commit();
            return response()->json(['message' => 'Docente registrado exitosamente.'], 200);
    
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ocurrió un error al registrar el docente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function obtenerDatosEstudiante(){
        $idEstudiante = session('estudiante.id');
        $estudiante = Docente::find($idEstudiante);
        $datosEstudiante = [
            'nombreCuenta' => $estudiante->nombreCuenta,
            'nombre' => $estudiante->nombreEstudiante,
            'primerApellido' => $estudiante->primerApellido,
            'segundoApellido' => $estudiante->segundoApellido,
            'email' => $estudiante->email,
        ];
        return response()->json($datosEstudiante, 200);



    }

    public function obtenerDatosDocente(){
        $idDocente = session('docente.id'); 
        $docente = Docente::find($idDocente);
        $datosDocente = [
            'nombreCuenta' => $docente->nombreCuenta,
            'email' => $docente->email,
            'nombre' => $docente->nombreDocente,
            'primerApellido' => $docente->primerApellido,
            'segundoApellido' => $docente->segundoApellido,
        ];
        return response()->json($datosDocente, 200);
    }

    public function actualizarEstudiante(Request $request)
    {
        $request->validate([
            'contrasena' => 'required|string',
            'nombre' => 'sometimes|required|string',
            'primerApellido' => 'sometimes|required|string',
            'segundoApellido' => 'sometimes|required|string',
            'email' => 'sometimes|required|email',
        ]);
        $estudiante = session('estudiante');

        if (!$estudiante) {
            return response()->json(['error' => 'No se encontraron datos del usuario en la sesión'], 401);
        }
        $userE = Estudiante::find($estudiante['id']);
        
        if (!$userE) {
            return response()->json(['error' => 'Estudiante no encontrado en la base de datos'], 404);
        }

        if (!Hash::check($request->contrasena, $userE->contrasena)) {
            return response()->json(['error' => 'Contraseña incorrecta'], 403);
        }

        $userE->nombreEstudiante = $request->nombre ?? $userE->nombreEstudiante;
        $userE->primerApellido = $request->primerApellido ?? $userE->primerApellido;
        $userE->segundoApellido = $request->segundoApellido ?? $userE->segundoApellido;
        $userE->email = $request->email ?? $userE->email;

        $userE->save();

        session()->put('estudiante', [
            'id' => $userE->idEstudiante,
            'nombre' => $userE->nombreEstudiante,
            'primerApellido' => $userE->primerApellido,
            'segundoApellido' => $userE->segundoApellido,
            'role' => 'estudiante',
        ]);

        return response()->json(['success' => 'Datos del estudiante actualizados correctamente']);
    }
    
    
    
    
}