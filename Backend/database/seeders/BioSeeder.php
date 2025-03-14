<?php

namespace Database\Seeders;

use App\Models\Bio;
use Illuminate\Database\Seeder;

class BioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bio::factory(30)->create();
    }
}