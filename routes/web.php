<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FamilyController;

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

    Route::get('join-family', function () {
        return Inertia::render('join-family');
    })->name('join-family');

    Route::get('return-family', function () {
        return Inertia::render('return-family');
    })->name('return-family');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
