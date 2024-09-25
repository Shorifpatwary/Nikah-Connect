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
    // Define roles and corresponding permissions using enum values directly
    $roles = [
      RolesEnum::USER->value => [PermissionsEnum::ALL_FOR_USER->value],
      RolesEnum::SUPER_ADMIN->value => [PermissionsEnum::ALL->value],
      RolesEnum::ADMIN->value => [PermissionsEnum::ALL->value],
      RolesEnum::EDITOR->value => [PermissionsEnum::VIEW_USER->value],
      RolesEnum::WRITER->value => [PermissionsEnum::VIEW_USER->value],
      RolesEnum::USER_MANAGER->value => [PermissionsEnum::VIEW_USER->value],
    ];

    // Create roles and permissions
    foreach ($roles as $roleName => $permissions) {
      // Create or fetch the role
      $role = Role::firstOrCreate(['name' => $roleName]);

      // Iterate through permissions
      foreach ($permissions as $permissionName) {
        // Create or fetch the permission
        $permission = Permission::firstOrCreate(['name' => $permissionName]);

        // Assign permission to role
        $role->givePermissionTo($permission);
      }
    }
  }
}