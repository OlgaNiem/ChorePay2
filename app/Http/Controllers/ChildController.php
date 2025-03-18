<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
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
            Log::warning('Login failed', ['name' => $validatedData['name']]);
            return back()->withErrors(['name' => 'Invalid credentials']);
        }
    
        Auth::loginUsingId($child->parent_id);
        Session::put('child_id', $child->id);

        return redirect()->route('child-profile');
    }

    public function profile()
    {
        $childId = Session::get('child_id');

        if (!$childId) {
            return redirect()->route('login-child')->withErrors(['error' => 'Unauthorized']);
        }

        $child = Child::find($childId);

        if (!$child) {
            Session::forget('child_id');
            return redirect()->route('login-child')->withErrors(['error' => 'Unauthorized']);
        }

        return Inertia::render('child-profile', ['child' => $child]);
    }

    public function logout()
    {
        Session::forget('child_id');
        return redirect()->route('home');
    }

    protected function validateChild(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|max:255|unique:children,name',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }
}
