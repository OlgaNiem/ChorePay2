<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ChildMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Allow parents to proceed
        if (Auth::guard('web')->check()) {
            return $next($request);
        }

        // Allow children to proceed
        if (Auth::guard('children')->check()) {
            return $next($request);
        }

        return redirect()->route('login-child')->withErrors(['error' => 'Please log in as a child or parent']);
    }
}
