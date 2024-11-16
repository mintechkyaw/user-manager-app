<?php

use App\Http\Controllers\Api\Admin\PermissionController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\RolePermissionController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ProfileUpdateController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware(['validation'])->group(function () {
    Route::post('/register', RegisterController::class);
    Route::post('/login', LoginController::class);
});

Route::middleware(['auth:api', 'validation'])->group(function () {

    // Auth Related Routes
    Route::post('/logout', LogoutController::class);
    Route::post('/update-profile', ProfileUpdateController::class);
    Route::get('/user', function (Request $request) {
        $user = new UserResource($request->user());

        return response()->json($user, 200);
    });

    // Resource Routes
    Route::apiResource('/posts', PostController::class);
    Route::apiResource('/users', UserController::class);

});

// Admin Only Routes
Route::prefix('/admin')->middleware(['auth:api', 'role:admin', 'validation'])->group(function () {
    Route::apiResource('/roles', RoleController::class);
    Route::apiResource('/permissions', PermissionController::class);
    Route::put('/role-permission/{role}', [RolePermissionController::class, 'roleAddPermission']);
    Route::delete('/role-permission/{role}', [RolePermissionController::class, 'roleMinusPermission']);
});

// Route::get('/users', function (Request $request) {
//     // sleep(2);
//     if ($request->per_page == -1) {
//         return response()->json(['data' => User::select('id', 'name', 'email', 'created_at')->get()]);
//     }
//     return User::select('id', 'name', 'email', 'created_at')
//         ->when($request->search, function ($query) use ($request) {
//             $query->whereAny(['name', 'email'], 'like', "%$request->search%");
//         })
//         ->paginate($request->per_page);
// });
