<?php

namespace Database\Factories;

use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MarriageInfo>
 */
class MarriageInfoFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    static $bioIdsWithoutThisSection;

    // Initialize the $bioIdsWithoutThisSection only once
    if (is_null($bioIdsWithoutThisSection)) {
      $bioIdsWithoutThisSection = Bio::doesntHave('marriageInfo')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutThisSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }

    return [
      'prev_marriage' => $this->faker->paragraph(),
      'work_after' => $this->faker->sentence(),
      'study_after' => $this->faker->sentence(),
      'ceremony_plans' => $this->faker->sentence(),
      'partner_view_rules' => $this->faker->sentence(),
      'marriage_weakness' => $this->faker->paragraph(),
      'family_pref' => $this->faker->paragraph(),
      'dowry_amount' => $this->faker->sentence(),
      'dowry_opinion' => $this->faker->paragraph(),
      'compromise_factors' => $this->faker->paragraph(),
      'cash_gift_opinion' => $this->faker->paragraph(),
      'bio_id' => $bioId,
    ];
  }
}