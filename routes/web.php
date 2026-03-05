<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\PostController;
use App\Models\Classes;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/kelas/{slug}', [ClassController::class, 'publicShow'])->name('class.public');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('classes', ClassController::class)
        ->parameters(['classes' => 'class'])
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::resource('posts', PostController::class)
        ->only(['store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';

