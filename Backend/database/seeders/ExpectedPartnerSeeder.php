<?php

namespace Database\Seeders;

use App\Models\ExpectedPartner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpectedPartnerSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    ExpectedPartner::factory(10)->create();
  }
}