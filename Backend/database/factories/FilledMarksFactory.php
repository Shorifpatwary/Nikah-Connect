<?php

namespace Database\Factories;

use App\Models\Bio;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FilledMarks>
 */
class FilledMarksFactory extends Factory
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
      $bioIdsWithoutThisSection = Bio::doesntHave('filledMarks')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutThisSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }
    return [
      'general_filled_marks' => $this->faker->numberBetween(0, 100),
      'location_filled_marks' => $this->faker->numberBetween(0, 100),
      'education_filled_marks' => $this->faker->numberBetween(0, 100),
      'personal_info_filled_marks' => $this->faker->numberBetween(0, 100),
      'family_filled_marks' => $this->faker->numberBetween(0, 100),
      'profession_filled_marks' => $this->faker->numberBetween(0, 100),
      'religious_activity_filled_marks' => $this->faker->numberBetween(0, 100),
      'marital_info_filled_marks' => $this->faker->numberBetween(0, 100),
      'expected_partner_filled_marks' => $this->faker->numberBetween(0, 100),
      'hidden_info_filled_marks' => $this->faker->numberBetween(0, 100),

      'bio_id' => $bioId,
    ];
  }
}