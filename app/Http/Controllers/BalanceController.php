<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Task;
use App\Models\Transaction;

class BalanceController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $income = Transaction::where('user_id', $user->id)
            ->where('type', 'income')
            ->sum('amount');

        $expense = Task::where('created_by', $user->uuid)
            ->where('status', 'completed')
            ->where('is_approved', true)
            ->whereNotNull('paid_amount')
            ->sum('paid_amount');

        $totalBalance = $income - $expense;

        return Inertia::render('balance', [
            'totalBalance' => number_format($totalBalance, 2),
            'income' => number_format($income, 2),
            'expense' => number_format($expense, 2),
        ]);
    }
}
