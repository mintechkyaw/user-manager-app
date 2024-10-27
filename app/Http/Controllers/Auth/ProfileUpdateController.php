<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;

class ProfileUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ProfileUpdateRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();
        $user->update($data);

        return response()->json(
            ['message' => 'Your Information Updated', 'user' => new UserResource($user)],
            202
        );
    }
}
