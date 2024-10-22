<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Post;
use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Post::factory(20)->create();

        Permission::create(['name' => 'create-post']);
        Permission::create(['name' => 'read-post']);
        Permission::create(['name' => 'update-post']);
        Permission::create(['name' => 'delete-post']);

        Permission::create(['name' => 'create-user']);
        Permission::create(['name' => 'read-user']);
        Permission::create(['name' => 'update-user']);
        Permission::create(['name' => 'delete-user']);

        Role::create(['name' => 'admin'])->givePermissionTo(['create-post', 'read-post', 'update-post', 'delete-post', 'create-user', 'read-user', 'update-user', 'delete-user']);
        Role::create(['name' => 'editor'])->givePermissionTo(['read-post', 'update-post', 'read-user', 'update-user']);
        Role::create(['name' => 'user'])->givePermissionTo(['read-post']);

        $adminUser = User::create([
            'name' => 'Min Thant Kyaw',
            'email' => 'minthantk642@gmail.com',
            'password' => Hash::make('asdf1234..'),
        ]);

        $editorUser = User::create([
            'name' => 'Min Khant Kyaw',
            'email' => 'minthantkyaw@gmail.com',
            'password' => Hash::make('asdf1234..'),
        ]);

        // $adminUser->assignRole('admin');
        // $editorUser->assignRole('editor');
        // User::factory(10)->create();

    }
}
