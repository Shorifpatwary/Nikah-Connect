<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
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
            RolesEnum::USER => [PermissionsEnum::ALL_FOR_USER],
            RolesEnum::SUPER_ADMIN => [PermissionsEnum::ALL],
            RolesEnum::ADMIN => [PermissionsEnum::ALL],
            RolesEnum::EDITOR => [PermissionsEnum::VIEW_USER],
            RolesEnum::WRITER => [PermissionsEnum::VIEW_USER],
            RolesEnum::USER_MANAGER => [PermissionsEnum::VIEW_USER],
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