<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * Show the create task page with the parent's children.
     */
    public function create(): Response
    {
        $user = Auth::user();

        return Inertia::render('new-task', [
            'children' => User::where('parent_id', $user->id)->where('role', 'child')->get(),
        ]);
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

        try {
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
        } catch (\Exception $e) {
            Log::error('Task creation failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}
