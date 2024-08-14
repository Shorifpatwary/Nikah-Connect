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
      'age' =>  $this->faker->randomNumber(2),
      'complexion' =>  $this->faker->randomElement(StatusEnum::COMPLEXIONS),
      'height' =>  $this->faker->randomFloat(2, 150, 200),
      'marital_status' =>  $this->faker->randomElement(StatusEnum::MARITAL_STATUS),
      'educational_qualification' => $this->faker->sentence,
      'profession' => $this->faker->sentence,
      'economic_status' => $this->faker->randomElement(StatusEnum::ECONOMIC_STATUS),
      'family' => $this->faker->sentence,
      'about_partner' => $this->faker->paragraph,

      'bio_id' => $bioId,
    ];
  }
}