<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $user = User::where('uuid', Auth::user()->uuid)->with('children')->firstOrFail();


        return Inertia::render('dashboard', [
            'auth' => ['user' => $user],
            'children' => $user->children->where('role', 'child')->values()->map->only(['uuid', 'name']),
            'tasks' => Task::where('created_by', $user->uuid)->get(),
        ]);
    }
}
