<?php

namespace Database\Factories;

use App\Models\Bio;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class bio_tagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bio_id' => Bio::pluck('id')->random(),
            'tag_id' => Tag::pluck('id')->random(),
        ];
    }
}