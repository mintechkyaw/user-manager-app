<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->hasPermissionTo('read-user')) {
            $users = User::simplePaginate(perPage: 10)->except(Auth::id());

            return UserResource::collection($users);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => "You don't have permission to view user",
        ], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        if (auth()->user()->hasPermissionTo('create-user')) {
            $data = $request->validated();
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
            ], 201);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => "You don't have permission to Create User",
        ], 403);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if (auth()->user()->hasPermissionTo('read-user')) {
            return new UserResource($user);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => "You don't have permission to view user",
        ], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request, User $user)
    {
        if (auth()->user()->hasPermissionTo('update-user')) {
            $data = $request->validated();
            $user->update($data);

            return response()->json(['message' => 'User Profile Updated.'], 202);
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => "You don't have permission to edit user",
        ], 403);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (Auth::user()->hasPermissionTo('delete-user')) {
            switch ($user->id) {
                case Auth::id():
                    return response()->json(["message'=> 'You're deleting yourself "], 401);
                default:
                    $user->delete();

                    return response()->json(['message' => 'User Deleted.'], 202);
            }
        }

        return response()->json([
            'error' => 'Unauthorized',
            'msg' => "You don't have permission to delete user",
        ], 403);

    }
}
