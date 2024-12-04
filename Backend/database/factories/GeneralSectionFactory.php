<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\Bio;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GeneralSection>
 */
class GeneralSectionFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    static $bioIdsWithoutGeneralSection;

    // Initialize the $bioIdsWithoutGeneralSection only once
    if (is_null($bioIdsWithoutGeneralSection)) {
      $bioIdsWithoutGeneralSection = Bio::doesntHave('generalSection')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutGeneralSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }

    return [
      'gender' => $this->faker->randomElement(StatusEnum::GENDERS),
      'marital_status' => $this->faker->randomElement(StatusEnum::MARITAL_STATUS),
      'birth_date' => $this->faker->dateTimeBetween('-50 years', '-18 years'),
      'height'
      => $this->faker->randomElement(StatusEnum::HEIGHTS),
      'weight' =>
      $this->faker->randomElement(StatusEnum::WEIGHTS),
      'complexion' => $this->faker->randomElement(StatusEnum::COMPLEXIONS),
      'blood_group' => $this->faker->randomElement(StatusEnum::BLOOD_GROUPS),
      'language_skills' => $this->faker->sentence,
      'location_id' => Location::pluck('id')->random(),
      'bio_id' => $bioId,
    ];
  }
}