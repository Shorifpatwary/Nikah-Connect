<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfessionSection>
 */
class ProfessionSectionFactory extends Factory
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
      'profession' =>
      $this->faker->randomElement(StatusEnum::PROFESSION_STATUS),
      'profession_description' => $this->faker->paragraph,
      'monthly_income' => $this->faker->randomFloat(2, 150, 200),

      'bio_id' => $bioId,
    ];
  }
}