<?php

namespace Database\Seeders;

use App\Models\LocationSection;
use Illuminate\Database\Seeder;

class LocationSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LocationSection::factory(30)->create();
    }
}
