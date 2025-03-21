<?php

namespace Database\Factories;

use App\Models\Bio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HiddenInfo>
 */
class HiddenInfoFactory extends Factory
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
      'name' => $this->faker->name,
      'email' => $this->faker->email(),
      'location' => $this->faker->text(500),
      'family_members_name' => $this->faker->sentence(),
      'current_parent' => $this->faker->sentence(),
      'parent_mobile' => $this->faker->phoneNumber(),
      'social_links' => $this->faker->sentence(),
      'permanent_address_map_location' => $this->faker->sentence(10),
      'present_address_map_location' => $this->faker->sentence(10),
      'documents_link' => $this->faker->url,

      'bio_id' => $bioId,
    ];
  }
}