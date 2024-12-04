<?php

namespace Database\Factories;

use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonalDetails>
 */
class PersonalDetailsFactory extends Factory
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
      $bioIdsWithoutThisSection = Bio::doesntHave('personalDetails')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutThisSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }

    return [
      'about_yourself' =>
      $this->faker->paragraph,
      'outdoor_clothing' => $this->faker->sentence(10),
      'physical_mental_illness' => $this->faker->paragraph,
      'favorite_books' => $this->faker->paragraph,
      'favorite_online_personalities' => $this->faker->paragraph,
      'device_usage_time' => $this->faker->paragraph,
      'affiliations' => $this->faker->paragraph,
      'bio_id' => $bioId,
    ];
  }
}