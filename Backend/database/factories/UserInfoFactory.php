<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserInfo>
 */
class UserInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'device_type' => $this->faker->randomElement(['mobile', 'desktop', 'tablet']),
            'device_os' => $this->faker->randomElement(['iOS', 'Android', 'Windows', 'MacOS', 'Linux']),
            'browser_name' => $this->faker->randomElement(['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera']),
            'browser_version' => $this->faker->numerify('##.0'),
            'ip_address' => $this->faker->ipv4(),
            'country' => $this->faker->country(),
            'city' => $this->faker->city(),
            'user_agent' => $this->faker->userAgent(),
            'registration_source' => $this->faker->randomElement(['web', 'mobile_app']),
            'device_model' => $this->faker->word(),
            'screen_resolution' => $this->faker->randomElement(['1920x1080', '1366x768', '1440x900']),
            'internet' => $this->faker->company(),
            'region' => $this->faker->state(),
            'postal' => $this->faker->postcode(),
            'loc' => $this->faker->latitude() . ',' . $this->faker->longitude(),
            'timezone' => $this->faker->timezone(),
            'user_id' => User::factory(),
        ];
    }
}
