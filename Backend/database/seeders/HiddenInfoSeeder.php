<?php

namespace Database\Seeders;

use App\Models\HiddenInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HiddenInfoSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    HiddenInfo::factory(30)->create();
  }
}
