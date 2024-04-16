<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define roles and corresponding permissions
        $roles = [
            'user' => ['*.bio', "*.profile"],
            'admin' => ["*"],
            'editor' => ['edit post', "create post", "view post", "delete post"],
        ];

        // Create roles and permissions
        foreach ($roles as $roleName => $permissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);

            foreach ($permissions as $permissionName) {
                // Check if permission already exists
                $permission = Permission::firstOrCreate(['name' => $permissionName]);
                $role->givePermissionTo($permission);
            }
        }
    }
}
