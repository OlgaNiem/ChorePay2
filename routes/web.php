<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\ChildController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('choose-role', function () {
    return Inertia::render('ChooseRole');
})->name('chooseRole');

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

    //Route::post('/login-child', [ChildController::class, 'login'])->name('login-child');
    //Route::get('/child-profile', [ChildController::class, 'profile'])->name('child-profile');
    //Route::post('/logout-child', [ChildController::class, 'logout'])->name('logout-child');

    Route::get('child-profile', function () {
        return Inertia::render('child-profile');
    })->name('child-profile');

  
    Route::get('join-family', function () {
        return Inertia::render('join-family');
    })->name('join-family');

    Route::get('return-family', function () {
        return Inertia::render('return-family');
    })->name('return-family');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
