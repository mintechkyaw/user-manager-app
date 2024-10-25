<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions')->get();

        return RoleResource::collection($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        $data = $request->validated();

        $role = Role::create([
            'name' => $data['name'],
        ]);
        $role->syncPermissions($data['permissions']);

        return response()->json([
            'msg' => 'Role Created',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        $data = $request->validated();
        $role->update([
            'name' => $data['name'],
        ]);
        $role->syncPermissions($data['permissions']);

        return response()->json([
            'msg' => 'Role Updated',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json([
            'msg' => 'Role Deleted',
        ], 200);
    }
}
