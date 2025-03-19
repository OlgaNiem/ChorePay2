<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('choose-role', function () {
    return Inertia::render('ChooseRole');
})->name('chooseRole');

// Parent routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('family-options', function () {
        return Inertia::render('family-options');
    })->name('family-options');

    Route::get('create-family', [FamilyController::class, 'create'])->name('create-family');
    Route::post('create-family', [FamilyController::class, 'store'])->name('store-family');

    Route::get('/add-child', [ChildController::class, 'create'])->name('add-child');
    Route::post('/store-child-profile', [ChildController::class, 'store'])->name('store-child-profile');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// Child routes
Route::middleware(['auth.children'])->group(function () {
    Route::get('/child-profile', [ChildController::class, 'profile'])->name('child-profile');
});

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('register', [AuthenticatedSessionController::class, 'create'])->name('register');
    Route::post('register', [AuthenticatedSessionController::class, 'store']);
    
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('login-child', [AuthenticatedSessionController::class, 'createChild'])->name('login-child');
    Route::post('login-child', [AuthenticatedSessionController::class, 'storeChild']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
