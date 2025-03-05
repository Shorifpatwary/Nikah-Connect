<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coin>
 */
class CoinFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'total_coin' => fake()->randomNumber(),
      'total_purchase' => fake()->randomNumber(),
      'total_used' => fake()->randomNumber(),

      'user_id' => User::pluck('id')->random(),
    ];
  }
}
