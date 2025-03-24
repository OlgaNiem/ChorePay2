<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function create(): Response
    {
        $user = Auth::user();

        return Inertia::render('new-task', [
            'children' => User::where('parent_id', $user->uuid)
                ->where('role', 'child')
                ->get(['uuid', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'reward' => 'required|numeric|min:0',
            'assigned_to' => 'required|exists:users,uuid',
            'due_date' => ['required', 'date', 'after_or_equal:today'],
        ]);

        try {
            Task::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'priority' => $validated['priority'],
                'reward' => $validated['reward'],
                'status' => 'pending',
                'due_date' => $validated['due_date'] ?? null,
                'assigned_to' => $validated['assigned_to'],
                'created_by' => Auth::user()?->uuid,
            ]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error('Task creation failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }

    public function index(): Response
    {
        $tasks = Task::with(['assignee' => function ($query) {
            $query->select('uuid', 'name');
        }])
        ->where('status', '!=', 'completed')
        ->paginate(10);
    
        return Inertia::render('tasks', [
            'tasks' => $tasks,
        ]);       
    }
}
