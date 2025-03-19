<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class BlockChildrenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('children')->check()) {
            return redirect()->route('child-profile')->withErrors(['error' => 'Access denied for children']);
        }

        return $next($request);
    }
}
