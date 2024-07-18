<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate a tag name
        $name = $this->faker->word;

        // Generate related search text with many words separated by commas
        $relatedWords = collect($this->faker->words(10))
            ->map(fn ($word) => "{$name} {$word}")
            ->implode(', ');

        return [
            'name' => $name,
            'search_text' => $relatedWords,
            'group_name' => $this->faker->word(),
            'status' => $this->faker->randomElement(['approved', 'pending_approve', 'reject']),
        ];
    }
}

// todo : change 'pending_approve' option to this " pending_approval " 