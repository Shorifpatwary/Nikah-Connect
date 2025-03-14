<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Contracts\Role;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Check if 'super admin' role count is zero
    $superAdminCount = User::with('roles')->get()->filter(
      fn($user) => $user->roles->where('name', RolesEnum::SUPER_ADMIN)->toArray()
    )->count();

    if ($superAdminCount === 0) {
      // Manually create a user with 'super admin' role
      $user = User::create([
        'name' => 'Super Admin',
        'email' => env('INITIAL_EMAIL', 'shorifpatwary999@gmail.com'),
        'password' => Hash::make('password'),
      ]);

      $user->assignRole(RolesEnum::SUPER_ADMIN);
    } else {
      User::factory(30)->create();
    }
  }
}
