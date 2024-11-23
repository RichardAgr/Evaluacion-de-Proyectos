<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Docente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('nombreCuenta', 'contrasena');

        // Primero, intentamos encontrar al usuario como estudiante
        $userE = Estudiante::where('nombreCuenta', $credentials['nombreCuenta'])->first();

        // También comprobamos si es un docente
        $userD = Docente::where('nombreCuenta', $credentials['nombreCuenta'])->first();

        // Si encontramos un estudiante
        if ($userE) {
            // Verificamos la contraseña del estudiante
            if (Hash::check($credentials['contrasena'], $userE->contrasena)) {
                // Autenticación exitosa
                // Aquí no necesitamos llamar a session()->start() explícitamente, Laravel lo maneja automáticamente
                
                // Almacenamos los datos del estudiante en la sesión manualmente
                session()->put('estudiante', [
                    'id' => $userE->idEstudiante,
                    'nombre' => $userE->nombreEstudiante,
                    'primerApellido' => $userE->primerApellido,
                    'segundoApellido' => $userE->segundoApellido,
                    'role' => 'estudiante'
                ]);
                
                // Aquí simplemente retornamos la respuesta con el usuario en la sesión
                return response()->json([
                    'mensaje' => 'Login exitoso',
                    'usuario' => session('estudiante'), // Esto accede a los datos almacenados en la sesión
                    'role' => 'estudiante'
                ]);
            } else {
                // Contraseña incorrecta
                return response()->json(['error' => 'Credenciales incorrectas'], 401);
            }
        } elseif ($userD) {
            // Si es un docente, verificamos la contraseña de la misma manera
            if (Hash::check($credentials['contrasena'], $userD->contrasena)) {
                // Autenticación exitosa para docente
                session()->put('docente', [
                    'id' => $userD->idDocente,
                    'nombre' => $userD->nombreDocente,
                    'primerApellido' => $userD->primerApellido,
                    'segundoApellido' => $userD->segundoApellido,
                    'role' => 'docente'
                ]);

                return response()->json([
                    'mensaje' => 'Login exitoso',
                    'usuario' => session('docente'),
                    'role' => 'docente'
                ]);
            } else {
                // Contraseña incorrecta
                return response()->json(['error' => 'Credenciales incorrectas'], 401);
            }
        } else {
            // Usuario no encontrado
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

    }   
    public function logoutEstudiante()
    {   
        session()->forget('estudiante');
        // Eliminar la sesión
        if(!session()->has('estudiante')){
            return response()->json(['mensaje' => 'Sesión cerrada'], 200);
    }else{
        return response()->json(['mensaje' => 'Error cerrada'],404);
    }
        }

    public function isSessionActiveEstudiante()
    {
        if (session()->has('estudiante')) {
            return response()->json(['mensaje' => 'Sesión activa' , 'usuario' => session('estudiante')], 200);
        } else {
            return response()->json(['mensaje' => 'No hay sesión activa'], 401);
        }
        
    }
    public function logoutDocente($idDoc)
    {   
        session()->forget('docente');
        // Eliminar la sesión
        if(!session()->has('docente')){
            return response()->json(['mensaje' => 'Sesión cerrada'], 200);
    }else{
        return response()->json(['mensaje' => 'Error cerrada'],404);
    }
        }

    public function isSessionActiveDocente()
    {
        if (session()->has('docente')) {
            return response()->json(['mensaje' => 'Sesión activa' , 'usuario' => session('docente')], 200);
        } else {
            return response()->json(['mensaje' => 'No hay sesión activa'], 401);
        }
    }   

    public function logout(){
        if(session()->has('estudiante')){
            session()->forget('estudiante');
            return response()->json(['mensaje' => 'Sesión Estudiante cerrada'], 200);
        }else if(session()->has('docente')){
            session()->forget('docente');
            return response()->json(['mensaje' => 'Sesión Docente cerrada'], 200);
        }
    }
}
