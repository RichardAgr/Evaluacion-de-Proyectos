<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Docente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'nombreCuenta' => 'required|email',
            'password' => 'required'
        ]);

        // Intentar autenticación con las credenciales en la tabla personalizada
        if (Auth::attempt($request->only('nombreCuenta', 'password'))) {
            // Obtener el usuario autenticado
            $usuario = Auth::user();

            // Retornar respuesta de éxito
            return response()->json([
                'mensaje' => 'Login exitoso',
                'usuario' => [
                    'id' => $usuario->id_usuario, // Usa el nombre de la columna en tu tabla
                    'nombre' => $usuario->nombre, // Asegúrate de que coincida con el campo en tu tabla
                    'email' => $usuario->email
                ]
            ]);
        } else {
            // Retornar error si las credenciales son incorrectas
            return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
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
            session()->put('estudiante', [
                'id' => $usuario->idEstudiante,
                'nombre' => $usuario->nombreEstudiante,
                'primerApellido' => $usuario->primerApellido,
                'segundoApellido' => $usuario->segundoApellido
            ]);

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
