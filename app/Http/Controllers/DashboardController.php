<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('dashboard', [
            'auth' => ['user' => $user],
            'children' => User::where('parent_id', $user->id)->where('role', 'child')->get(),
            'tasks' => Task::where('created_by', $user->id)->get(),
        ]);
    }
}
