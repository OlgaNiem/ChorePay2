<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;

use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

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

            Log::info('Redirecting to dashboard from TaskController@store');
            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            Log::error('Task creation failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }

    public function index(): Response
    {
        $user = Auth::user();
        $today = now()->startOfDay();

        $allTasks = Task::with(['assignee' => function ($query) {
            $query->select('uuid', 'name');
        }])
            ->where('status', '!=', 'completed')
            ->where('created_by', $user->uuid)
            ->orderBy('due_date')
            ->get();

        $high = $allTasks->filter(function ($task) use ($today) {
            $due = Carbon::parse($task->due_date);
            return $task->priority === 'high' && !$due->isBefore($today);
        });

        $upcoming = $allTasks->filter(function ($task) use ($today, $high) {
            $due = Carbon::parse($task->due_date);
            return !$high->contains($task) && !$due->isBefore($today);
        });

        $overdue = $allTasks->filter(function ($task) use ($today) {
            return Carbon::parse($task->due_date)->isBefore($today);
        });

        $ordered = $high->concat($upcoming)->concat($overdue)->values();

        $page = request()->get('page', 1);
        $perPage = 10;
        $items = $ordered->slice(($page - 1) * $perPage, $perPage)->values();

        $paginated = new LengthAwarePaginator(
            $items,
            $ordered->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return Inertia::render('tasks', [
            'tasks' => $paginated,
        ]);
    }


    public function markAsDone($id)
    {
        try {
            $task = Task::findOrFail($id);
            $user = Auth::guard('children')->user();

            if (!$user || $task->assigned_to !== $user->uuid) {
                Log::warning('Child tried to mark task not assigned to them', [
                    'child_uuid' => $user?->uuid,
                    'task_id' => $id,
                ]);
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            if ($task->status !== 'pending') {
                Log::info('Task is already completed or not pending', [
                    'task_id' => $id,
                    'current_status' => $task->status,
                ]);
                return response()->json(['message' => 'Task is not in pending status'], 400);
            }

            $task->status = 'completed';
            $task->save();

            Log::info('Task marked as completed by child', [
                'task_id' => $id,
                'child_uuid' => $user->uuid,
            ]);

            return redirect()->route('child-profile.child');
        } catch (\Exception $e) {
            Log::error('Error marking task as completed: ' . $e->getMessage(), [
                'task_id' => $id,
            ]);
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function completed(Request $request): Response
    {
        if (Auth::guard('children')->check()) {
            abort(403, 'Unauthorized');
        }

        $user = Auth::user();

        $query = Task::with(['assignee' => function ($query) {
            $query->select('uuid', 'name');
        }])
            ->where('status', 'completed')
            ->where('created_by', $user->uuid);

        if ($request->get('filter') === 'unpaid') {
            $query->whereNull('paid_amount');
        }

        if ($request->filter === 'paid') {
            $query->whereNotNull('paid_amount');
        }

        $tasks = $query
            ->orderByDesc('due_date')
            ->paginate(10);

        Log::info('Completed tasks page viewed by', ['parent_uuid' => $user->uuid]);

        return Inertia::render('completed-tasks', [
            'tasks' => $tasks,
        ]);
    }

    public function approve(string $id): RedirectResponse
    {
        $task = Task::findOrFail($id);

        if (Auth::guard('children')->check()) {
            abort(403, 'Unauthorized');
        }

        if ($task->status === 'pending') {
            $task->status = 'completed';
        }

        $task->is_approved = true;
        $task->save();

        return back()->with('success', 'Task approved');
    }

    public function pay(string $id): RedirectResponse
    {
        $task = Task::findOrFail($id);

        if (!$task->is_approved) {
            return back()->withErrors(['error' => 'Task must be approved before paying reward.']);
        }

        $task->paid_amount = $task->reward;
        $task->save();

        return back()->with('success', 'Reward paid');
    }
}
