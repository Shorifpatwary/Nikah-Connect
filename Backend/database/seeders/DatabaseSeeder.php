<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ExpectedPartner;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $this->call([
      // RolesAndPermissionsSeeder::class,
      // UserSeeder::class,
      // LocationSeeder::class,
      // UserInfoSeeder::class,
      // TagSeeder::class,

      BioSeeder::class,
      BioTagSeeder::class,
      GeneralSectionSeeder::class,
      LocationSectionSeeder::class,
      EducationSectionSeeder::class,
      PersonalDetailsSeeder::class,
      FamilyInfoSectionSeeder::class,
      ProfessionSectionSeeder::class,
      ExpectedPartnerSeeder::class,
      HiddenInfoSeeder::class,
      ReligiousActivitySeeder::class,
      MarriageInfoSeeder::class,
      FilledMarksSeeder::class,
      CoinSeeder::class,
      ViewSeeder::class,
    ]);
  }
}