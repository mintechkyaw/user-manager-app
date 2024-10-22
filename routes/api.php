<?php

use App\Http\Controllers\Api\Admin\PermissionController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\RolePermissionController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', RegisterController::class)->middleware([HandlePrecognitiveRequests::class]);
Route::post('/login', LoginController::class);

Route::middleware(['auth:api',HandlePrecognitiveRequests::class])->group(function () {

    // Auth Related Routes
    Route::post('/logout', LogoutController::class);
    Route::get('/user', function (Request $request) {
        $user = new UserResource($request->user()->load('roles'));

        return response()->json($user, 200);
    });

    // Resource Routes
    Route::apiResource('/posts', PostController::class);
    Route::apiResource('/users', UserController::class);

});

Route::prefix('/admin')->middleware(['auth:api', 'role:admin'])->group(function () {
    Route::apiResource('/roles', RoleController::class);
    Route::apiResource('/permissions', PermissionController::class);
    Route::put('/role-permission/{role}', [RolePermissionController::class, 'roleAddPermission']);
    Route::delete('/role-permission/{role}', [RolePermissionController::class, 'roleMinusPermission']);
});

Route::prefix('/editor')->middleware(['auth:api', 'role:editor', ''])->group(function () {
    Route::apiResource('/users', UserController::class)->except(['store', 'destroy']);
});
