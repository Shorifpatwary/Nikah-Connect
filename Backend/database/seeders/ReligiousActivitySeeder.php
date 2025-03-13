<?php

namespace Database\Seeders;

use App\Models\ReligiousActivity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReligiousActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReligiousActivity::factory(30)->create();
    }
}
