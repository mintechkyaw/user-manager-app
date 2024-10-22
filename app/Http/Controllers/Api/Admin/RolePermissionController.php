<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RolePermissionRequest;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    public function roleAddPermission(Role $role, RolePermissionRequest $request)
    {
        $data = $request->validated();

        return [
            'role' => $role,
            'permission' => $data,
        ];
    }

    public function roleMinusPermission(Role $role, RolePermissionRequest $request)
    {
        $data = $request->validated();

        return [
            'role' => $role,
            'permission' => $data,
        ];
    }
}
