<?php

namespace Database\Factories;

use App\Models\Bio;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\View>
 */
class ViewFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'user_id' => User::pluck('id')->random(),
      'bio_id' =>  Bio::pluck('id')->random(),
    ];
  }
}
