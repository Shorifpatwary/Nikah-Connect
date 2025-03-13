<?php

namespace Database\Seeders;

use App\Models\EducationSection;
use Illuminate\Database\Seeder;

class EducationSectionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    EducationSection::factory(30)->create();
  }
}