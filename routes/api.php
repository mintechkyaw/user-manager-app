<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user()->load('roles');
    });
    Route::apiResource('/posts', PostController::class)->only(['index', 'show']);
    Route::post('/logout', LogoutController::class);
});

Route::prefix('/admin')->middleware(['auth:api', 'role:admin'])->group(function () {
    Route::apiResource('/posts', PostController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('/users', UserController::class);
});

Route::prefix('/editor')->middleware(['auth:api', 'role:editor',''])->group(function () {
    Route::apiResource('users', UserController::class)->except(['store', 'destroy']);
    Route::apiResource('/users', UserController::class)->except(['store', 'destroy']);
});
