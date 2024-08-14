<?php

namespace Database\Factories;

use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EducationSection>
 */
class EducationSectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $bioIdsWithoutEducationSection;

        // Initialize the $bioIdsWithoutEducationSection only once
        if (is_null($bioIdsWithoutEducationSection)) {
            $bioIdsWithoutEducationSection = Bio::doesntHave('educationSection')->pluck('id')->all();
        }

        // Get the next available bio_id from the list
        $bioId = array_shift($bioIdsWithoutEducationSection);

        // If no available Bio IDs, create a new Bio and get its ID
        if (is_null($bioId)) {
            $bioId = Bio::factory()->create()->id;
        }

        return [
            'education_medium' => $this->faker->randomElement(['জেনারেল', 'কাউমি', 'আলিয়া', 'দেশের বাইরে', 'অন্যান্য']),
            'highest_qualification' => $this->faker->sentence,
            'current_study' => $this->faker->optional()->sentence,
            'previous_exams' => $this->faker->paragraph,
            'other_qualifications' => $this->faker->optional()->paragraph,
            'bio_id' => $bioId,
        ];
    }
}