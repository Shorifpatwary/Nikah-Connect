<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bio>
 */
class BioFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    static $userIdsWithoutBio;

    // Initialize the $userIdsWithoutBio only once
    if (is_null($userIdsWithoutBio)) {
      $userIdsWithoutBio = User::doesntHave('bio')->pluck('id')->all();
    }

    // Get the next available bio_id from the list
    $userId = array_shift($userIdsWithoutBio);

    // If no available Bio IDs, create a new Bio and get its ID
    if (is_null($userId)) {
      $userId = User::factory()->create()->id;
    }

    return [
      'title' => $this->faker->sentence,
      'bio_profile' => $this->faker->randomElement(StatusEnum::BIO_PROFILE_TYPES),
      'status' => $this->faker->randomElement(StatusEnum::BIO_STATUS),
      'type' => $this->faker->randomElement(StatusEnum::BIO__TYPES),
      'user_id' =>  $userId,
    ];
  }
}