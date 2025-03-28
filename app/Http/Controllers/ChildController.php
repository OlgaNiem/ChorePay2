<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use function redirect;
use function back;

class ChildController extends Controller
{
    public function create()
    {
        return Inertia::render('add-child');
    }

    public function store(Request $request)
    {
        $validatedData = $this->validateChild($request);

        try {
            $parent = Auth::user();

            $child = User::create([
                'id' => (string) Str::uuid(),
                'uuid' => (string) Str::uuid(),
                'name' => $validatedData['name'],
                'password' => Hash::make($validatedData['password']),
                'parent_id' => $parent->uuid,
                'family_id' => $parent->family_id,
                'role' => 'child',
            ]);

            return Inertia::location(route('dashboard'));
        } catch (\Exception $e) {
            Log::error('Error creating child profile: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong! Please try again later.']);
        }
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $child = User::where('name', $validatedData['name'])
            ->where('role', 'child')
            ->first();

        if (!$child || !Hash::check($validatedData['password'], $child->password)) {
            Log::warning('Child login failed', ['name' => $validatedData['name']]);
            return back()->withErrors(['name' => 'Invalid credentials']);
        }

        Auth::guard('web')->logout();
        session()->invalidate();
        session()->regenerateToken();

        Auth::guard('children')->login($child);
        session()->regenerate();

        Log::info('Child logged in successfully', ['child_uuid' => $child->uuid]);

        return redirect()->route('child-profile.child');
    }

    public function profile($childId = null)
    {
        if (Auth::guard('children')->check()) {
            $child = Auth::guard('children')->user();
        } elseif (Auth::check()) {
            $parent = Auth::user();
    
            $child = User::where('role', 'child')
                ->where('parent_id', $parent->uuid)
                ->when($childId, fn($query, $childId) => $query->where('uuid', $childId))
                ->first();
    
            if (!$child) {
                return redirect()->route('dashboard')->withErrors([
                    'error' => 'Child not found or unauthorized'
                ]);
            }
        } else {
            return redirect()->route('login')->withErrors([
                'error' => 'Unauthorized'
            ]);
        }
        
        $tasks = \App\Models\Task::where('assigned_to', $child->uuid)->get();
    
        return Inertia::render('child-profile', [
            'child' => $child,
            'tasks' => $tasks,
        ]);
    }
    

    public function logout()
    {
        Auth::guard('children')->logout();
        session()->invalidate();
        session()->regenerateToken();

        Log::info('Child logged out successfully');

        return redirect()->route('choose-role');
    }

    protected function validateChild(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }
}
