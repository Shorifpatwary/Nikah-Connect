<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
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
        return [
            'title' => $this->faker->sentence,
            'status' => $this->faker->randomElement(StatusEnum::BIO_STATUS),
        ];
    }
}

// not working. try to do something from the general factory. 
// create general section by checking the condition. 
// other wise create this from the bio factory. 
// this is bio factory code "  public function definition(): array
//     {
//         return [
//             'title' => $this->faker->sentence,
//             'status' => $this->faker->randomElement([
//                 'incomplete',
//                 'approved',
//                 'pending_approval',
//                 'reject',
//                 'married',
//                 'inactive',
//             ]),
//         ];
//     } "