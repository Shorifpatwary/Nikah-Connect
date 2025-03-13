<?php

namespace Database\Seeders;

use App\Models\PersonalDetails;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonalDetailsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    PersonalDetails::factory(30)->create();
  }
}
