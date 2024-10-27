<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($request->path() == 'api/user') {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'role' => $this->roles()->first() ? $this->roles->first()->name : null,
                'permissions' => $this->getAllPermissions()->map(function ($permission) {
                    return $permission->name;
                }),
                'profile_created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
                'profile_updated_at' => $this->created_at != $this->updated_at
                    ? $this->updated_at->toDateTimeString()
                    : null,
            ];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->roles()->first() ? $this->roles->first()->name : null,
            'profile_created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
            'profile_updated_at' => $this->created_at != $this->updated_at
                ? $this->updated_at->toDateTimeString()
                : null,
        ];
    }
}
