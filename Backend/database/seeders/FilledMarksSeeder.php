<?php

namespace Database\Seeders;

use App\Models\FilledMarks;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FilledMarksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FilledMarks::factory()->count(20)->create();
    }
}