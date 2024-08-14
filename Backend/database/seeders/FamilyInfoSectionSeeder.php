<?php

namespace Database\Seeders;

use App\Models\FamilyInfoSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FamilyInfoSectionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    FamilyInfoSection::factory(10)->create();
  }
}