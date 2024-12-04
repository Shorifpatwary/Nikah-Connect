<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpectedPartner>
 */
class ExpectedPartnerFactory extends Factory
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
      $bioIdsWithoutThisSection = Bio::doesntHave('expectedPartner')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutThisSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }
    return [
      'age' => (string) $this->faker->numberBetween(18, 99),
      'complexion' => implode(', ', $this->faker->randomElements(StatusEnum::COMPLEXIONS, 2),), // Convert array to string
      'height' => (string) $this->faker->numberBetween(150, 200),
      'marital_status' => implode(', ', $this->faker->randomElements(StatusEnum::MARITAL_STATUS, 2)), // Convert array to string
      'educational_qualification' => $this->faker->text(100),
      'profession' => $this->faker->text(100),
      'economic_status' => $this->faker->randomElement(StatusEnum::ECONOMIC_STATUS),
      'bio_profile_types' => implode(', ', $this->faker->randomElements(StatusEnum::BIO_PROFILE_TYPES, 2)),
      'family' => $this->faker->optional()->text(100),
      'about_partner' => $this->faker->optional()->text(250),

      'bio_id' => $bioId,
    ];
  }
}