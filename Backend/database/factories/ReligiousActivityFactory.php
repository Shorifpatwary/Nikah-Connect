<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReligiousActivity>
 */
class ReligiousActivityFactory extends Factory
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
      $bioIdsWithoutThisSection = Bio::doesntHave('religiousActivity')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $bioId = array_shift($bioIdsWithoutThisSection);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($bioId)) {
      $bioId = Bio::factory()->create()->id;
    }

    return [
      'prayer_habits' => $this->faker->sentence,
      'haram_relationships' =>
      $this->faker->sentence,
      'quran_recitation' => $this->faker->sentence,
      'mahram_adherence' => $this->faker->sentence,
      'has_beard' =>  $this->faker->sentence,
      'entertainment_habits' => $this->faker->sentence,
      'mazhab' => $this->faker->randomElement(StatusEnum::ALL_MAZHAB),
      'religious_beliefs' => $this->faker->paragraph,
      'religious_knowledge' => $this->faker->paragraph,
      'family_religious_environment' => $this->faker->paragraph,

      'bio_id' => $bioId,
    ];
  }
}