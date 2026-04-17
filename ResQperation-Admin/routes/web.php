<?php

<<<<<<< HEAD
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DisasterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ResponderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/disasters', [DisasterController::class, 'index'])->name('disasters.index');
    Route::get('/responders', [ResponderController::class, 'index'])->name('responders.index');
    Route::get('/households', [HouseholdController::class, 'index'])->name('households.index');
    Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');
    Route::get('/dispatch', fn () => Inertia::render('Dispatch'))->name('dispatch.index');
    Route::get('/map', fn () => Inertia::render('Map'))->name('map.index');
    Route::get('/alerts', fn () => Inertia::render('Alerts'))->name('alerts.index');
    Route::get('/sitrep', fn () => Inertia::render('SitRep'))->name('sitrep.index');
    Route::get('/resources', fn () => Inertia::render('Resources'))->name('resources.index');
    Route::get('/accounts', fn () => Inertia::render('Accounts'))->name('accounts.index');
    Route::get('/archives', fn () => Inertia::render('Archives'))->name('archives.index');

=======
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController; // 1. Add this import
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 2. Change this static function to use your Controller
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

<<<<<<< HEAD
require __DIR__.'/auth.php';
=======
require __DIR__.'/auth.php';
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
