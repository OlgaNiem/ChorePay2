<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Show the create task page.
     */
    public function create(): Response
    {
        return Inertia::render('new-task');
    }

    /**
     * Store a new task in the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'reward' => 'required|numeric|min:0',
            'assigned_to' => 'required|exists:users,id',
        ]);

        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'],
            'reward' => $validated['reward'],
            'status' => 'pending',
            'assigned_to' => $validated['assigned_to'],
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('dashboard')->with('message', 'Task created successfully!');
    }
}
