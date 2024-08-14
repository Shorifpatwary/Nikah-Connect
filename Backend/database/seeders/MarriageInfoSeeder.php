<?php

namespace Database\Seeders;

use App\Models\MarriageInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarriageInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MarriageInfo::factory(10)->create();
    }
}