<?php

namespace Database\Seeders;

use App\Models\ProfessionSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfessionSectionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    ProfessionSection::factory(30)->create();
  }
}
