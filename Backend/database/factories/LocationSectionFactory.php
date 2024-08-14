<?php

namespace Database\Factories;

use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LocationSection>
 */
class LocationSectionFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $bioIdsWithoutThisSection;

        // Initialize the $bioIdsWithoutGeneralSection only once
        if (is_null($bioIdsWithoutThisSection)) {
            $bioIdsWithoutThisSection = Bio::doesntHave('locationSection')->pluck('id')->all();
        }

        // Get the next available bio_id from the list
        $bioId = array_shift($bioIdsWithoutThisSection);

        // If no available Bio IDs, create a new Bio and get its ID
        if (is_null($bioId)) {
            $bioId = Bio::factory()->create()->id;
        }
        return [
            'permanent_address' => $this->faker->sentence,
            'present_address' => $this->faker->optional()->sentence,
            'relocate_plan' => $this->faker->optional()->sentence,
            'childhood_address' => $this->faker->optional()->sentence,
            'bio_id' => $bioId,
        ];
    }
}