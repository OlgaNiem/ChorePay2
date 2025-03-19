<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page for parents.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the login page for children.
     */
    public function createChild(Request $request): Response
    {
        return Inertia::render('auth/login-child', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle parent login.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Logout child session if active
        if (Auth::guard('children')->check()) {
            Auth::guard('children')->logout();
            session()->invalidate();
            session()->regenerateToken();
        }

        $request->authenticate();
        session()->regenerate();

        return redirect()->route('dashboard');
    }

    /**
     * Handle child login.
     */
    public function storeChild(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::guard('children')->attempt($validatedData)) {
            session()->regenerate();
            return redirect()->route('child-profile');
        }

        return back()->withErrors(['name' => 'Invalid credentials']);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('children')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
