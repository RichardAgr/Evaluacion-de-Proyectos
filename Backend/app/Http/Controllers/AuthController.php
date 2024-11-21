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
                    'usuario' => session('docente')
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


    //Logeo De Estudiante
    public function loginConIdEstudiante(Request $request)
    {
        // Asegúrate de que la sesión esté disponible
        
            session()->start(); // Inicia la sesión si no está iniciada
        

        // Validar que el ID esté presente en la solicitud
        $request->validate([
            'idEstudiante' => 'required|integer'
        ]);

        // Buscar al usuario por el ID
        $usuario = Estudiante::find($request->idEstudiante);

        if ($usuario) {
            // Crear una sesión para el usuario
            

            return response()->json(['mensaje' => 'Login exitoso', 'usuario' => session('estudiante')]);
        } else {
            // Retornar error si el usuario no existe
            return response()->json(['mensaje' => 'Usuario no encontrado'], 403);
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
    
    //Logeo de docente
    public function loginConIdDocente($idDoc)
    {
        // Asegúrate de que la sesión esté disponible
        
            session()->start(); // Inicia la sesión si no está iniciada
        

        // Validar que el ID esté presente en la solicitud
       /* $request->validate([
            'idDocente' => 'required|integer'
        ]);*/

        // Buscar al usuario por el ID
        $usuario = Docente::find($idDoc);

        if ($usuario) {
            // Crear una sesión para el usuario
            session()->put('docente', [
                'id' => $usuario->idDocente,
                'nombre' => $usuario->nombreDocente,
                'primerApellido' => $usuario->primerApellido,
                'segundoApellido' => $usuario->segundoApellido
            ]);

            return response()->json(['mensaje' => 'Login exitoso', 'usuario' => session('docente')]);
        } else {
            // Retornar error si el usuario no existe
            return response()->json(['mensaje' => 'Usuario no encontrado'], 403);
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
}
