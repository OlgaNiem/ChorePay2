<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ChildController extends Controller
{
    public function create()
    {
        return Inertia::render('add-child');
    }

    public function store(Request $request)
    {
        try {
            
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $parent = Auth::user();

            $child = new User();
            $child->name = $validatedData['name'];
            $child->email = $validatedData['email'];
            $child->password = Hash::make($validatedData['password']);
            $child->role = 'child';
            $child->family_id = $parent->family_id;
            $child->parent_id = $parent->id;
            $child->save();

            return redirect()->route('child-profile')->with('message', 'Child profile created successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
           
            \Log::error('Validation error creating child profile: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            \Log::error('Error creating child profile: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong! Please try again later.']);
        }
    }
}
