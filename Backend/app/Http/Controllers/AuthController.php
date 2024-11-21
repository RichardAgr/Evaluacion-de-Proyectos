<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Docente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;


class AuthController extends Controller
{
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'nombreCuenta' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('nombreCuenta', $request->nombreCuenta)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => 'admin',
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'nombreCuenta' => 'required|string',
            'password' => 'required|string',
        ]);

        // Buscar en las tablas Docente y Estudiante
        $user = Docente::where('nombreCuenta', $request->nombreCuenta)->first()
            ?? Estudiante::where('nombreCuenta', $request->nombreCuenta)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $role = $user instanceof Docente ? 'docente' : 'estudiante';
        $token = $user->createToken("{$role}_token")->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $role,
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Cierre de sesión exitoso']);
    }   
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Enlace de restablecimiento enviado.'])
            : response()->json(['message' => 'Error enviando enlace'], 500);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|confirmed',
            'token' => 'required',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Contraseña actualizada correctamente.'])
            : response()->json(['message' => 'Error actualizando contraseña'], 500);
    }


}
