<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('choose-role', function () {
    return Inertia::render('ChooseRole');
})->name('chooseRole');

// parents
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::inertia('family-options', 'family-options')->name('family-options');
    

    Route::get('create-family', [FamilyController::class, 'create'])->name('create-family');
    Route::post('create-family', [FamilyController::class, 'store'])->name('store-family');

    Route::get('join-family', function () {
        return Inertia::render('join-family');
    })->name('join-family');

    Route::post('join-family', [FamilyController::class, 'join'])->name('join-family.store');

    Route::get('return-family', function () {
        return Inertia::render('return-family');
    })->name('return-family');
    Route::post('return-family', [FamilyController::class, 'join'])->name('return-family.store');

    Route::get('/add-child', [ChildController::class, 'create'])->name('add-child');
    Route::post('/store-child-profile', [ChildController::class, 'store'])->name('store-child-profile');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/new-task', [TaskController::class, 'create'])->name('new-task');
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/completed-tasks', [TaskController::class, 'completed'])->name('completed-tasks.index');

    Route::post('/tasks', [TaskController::class, 'store'])->name('store-task');
    
    Route::post('/tasks/{id}/complete', [TaskController::class, 'markAsDone'])->name('tasks.complete');

    Route::get('/child-profile/{child}', [ChildController::class, 'profile'])->name('child-profile');
});

// children
Route::middleware(['auth:children'])->group(function () {
    Route::get('/child-profile', [ChildController::class, 'profile'])->name('child-profile.child');
    Route::post('/logout-child', [ChildController::class, 'logout'])->name('logout-child');
    Route::post('/tasks/{id}/complete', [TaskController::class, 'markAsDone'])->name('tasks.complete');
});


// guests
Route::middleware('guest')->group(function () {
    Route::get('register', [AuthenticatedSessionController::class, 'create'])->name('register');
    Route::post('register', [AuthenticatedSessionController::class, 'store']);
    
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('login-child', [AuthenticatedSessionController::class, 'createChild'])->name('login-child');
    Route::post('login-child', [ChildController::class, 'login']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
