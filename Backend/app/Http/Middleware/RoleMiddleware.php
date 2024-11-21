<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();

        if (!$user || $request->user()->role !== $role) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        return $next($request);
    }
}
