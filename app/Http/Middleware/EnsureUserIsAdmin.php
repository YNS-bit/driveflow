<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next)
{
    // On vérifie si l'utilisateur est connecté et s'il a le rôle 'admin'
    if ($request->user() && $request->user()->role === 'admin') {
        return $next($request);
    }

    // Sinon, on le renvoie vers l'accueil avec une erreur
    return redirect('/')->with('error', 'Accès réservé aux administrateurs.');
}
}
