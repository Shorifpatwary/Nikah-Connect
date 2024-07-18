<?php

namespace Database\Seeders;

use App\Models\BioTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BioTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BioTag::factory(30)->create();
    }
}
