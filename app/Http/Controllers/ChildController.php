<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
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

            $child = Child::create([
                'name' => $validatedData['name'],
                'password' => Hash::make($validatedData['password']),
                'parent_id' => $parent->id,
                'family_id' => $parent->family_id,
            ]);

            return redirect()->route('child-profile')->with('message', 'Child profile created successfully!');
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

        $child = Child::where('name', $validatedData['name'])->first();

        if (!$child || !Hash::check($validatedData['password'], $child->password)) {
            Log::warning('Child login failed', ['name' => $validatedData['name']]);
            return back()->withErrors(['name' => 'Invalid credentials']);
        }

        Auth::guard('web')->logout();
        session()->invalidate();
        session()->regenerateToken();

        Auth::guard('children')->login($child);
        session()->regenerate();

        Log::info('Child logged in successfully', ['child_id' => $child->id]);

        return redirect()->route('child-profile');
    }

    public function profile(Request $request, $childId = null)
    {
        if (Auth::guard('children')->check()) {
            $child = Auth::guard('children')->user();
        } else {
            $parent = Auth::user();
            if (!$parent) {
                return redirect()->route('login')->withErrors(['error' => 'Unauthorized']);
            }

            $child = Child::where('parent_id', $parent->id)
                ->when($childId, function ($query, $childId) {
                    return $query->where('id', $childId);
                })
                ->first();

            if (!$child) {
                return redirect()->route('dashboard')->withErrors(['error' => 'Child not found']);
            }
        }

        return Inertia::render('child-profile', ['child' => $child]);
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
            'name' => 'required|string|max:255|unique:children,name',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }
}
