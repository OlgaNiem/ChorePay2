<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use function event;
use function redirect;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:parent,child',
            'email' => $request->role === 'parent' ? 'required|string|email|max:255|unique:users' : 'nullable',
        ]);

        $userData = [
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ];

        if ($request->role === 'parent') {
            $userData['email'] = $request->email;
        }

        $user = User::create($userData);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('family-options');
    }
}
