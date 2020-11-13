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

Route::get('/guppen', function () {
    return inertia("App");
});

Route::get('/termine', function () {
    return inertia("App");
});

Route::get('/einstellungen', function () {
    return inertia("App");
});

Route::get('/guppen/{url}/allgemein', function () {
    return inertia("App");
});

Route::get('/guppen/{url}/wichtig', function () {
    return inertia("App");
});

Route::get('index', [App\Http\Controllers\AuthController::class, 'index']);
Route::get('login', [App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::get('register', [App\Http\Controllers\AuthController::class, 'register'])->name('register');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return inertia('Dashboard');
})->name('dashboard');
