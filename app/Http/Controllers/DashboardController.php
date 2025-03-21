<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('dashboard', [
            'auth' => ['user' => $user],
            'children' => $user->children()
                ->where('role', 'child')
                ->get(['uuid', 'name']),
            'tasks' => Task::where('created_by', $user->uuid)->get(),
        ]);
    }
}
