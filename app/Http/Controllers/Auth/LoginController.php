<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $data = $request->validated();

        if (auth()->guard('web')->attempt($data)) {
            $user = Auth::guard('web')->user();
            $token = $user->createToken('Personal Access Token')->accessToken;
            return response()->json([
                'msg' => "user crendential correct!",
                'token' => $token
            ]);
        } else {
        return response()->json(['error' => 'Unauthorized', "message" => "Invalid email or password."], 401);
        }
    }
}