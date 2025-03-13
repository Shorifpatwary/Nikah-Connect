<?php

namespace Database\Seeders;

use App\Models\GeneralSection;
use Illuminate\Database\Seeder;

class GeneralSectionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    GeneralSection::factory(30)->create();
  }
}