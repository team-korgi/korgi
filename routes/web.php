<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return inertia("App");
});

// Route::get('/login', function () {
   // return Inertia\Inertia::render("Login");
// });

// Route::prefix('auth')->group(function () {
    // Route::get('index', [App\Http\Controllers\AuthController::class, 'index']);
    // Route::get('login', [App\Http\Controllers\AuthController::class, 'login'])->name('login');
// });

Route::get('index', [App\Http\Controllers\AuthController::class, 'index']);
Route::get('login', [App\Http\Controllers\AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return inertia('Dashboard');
})->name('dashboard');
