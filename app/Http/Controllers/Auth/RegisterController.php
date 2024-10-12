<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        // $user->assignRole('user');
        $token = $user->createToken('Personal Access Token')->accessToken;
        return response()->json([
            'msg' => 'User registered successfully',
            'token' => $token,
        ], 201);
    }
}
