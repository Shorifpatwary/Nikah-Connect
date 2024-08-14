<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FamilyInfoSection>
 */
class FamilyInfoSectionFactory extends Factory
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
      $bioIdsWithoutThisSection = Bio::doesntHave('familyInfoSection')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutThisSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }
    return [
      'family_members_info' =>
      $this->faker->paragraph,
      'uncles_info' => $this->faker->paragraph,
      'economic_status' => $this->faker->randomElement(StatusEnum::ECONOMIC_STATUS),
      'economic_status_details' => $this->faker->paragraph,
      'bio_id' => $bioId,
    ];
  }
}