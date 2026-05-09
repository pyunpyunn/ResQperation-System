<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $role = Role::query()->firstOrCreate(
            ['role_key' => User::ROLE_ADMIN],
            ['role_name' => 'HQ Admin'],
        );

        return [
            'user_id' => 'USR-'.Str::upper((string) Str::uuid()),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->unique()->numerify('##########'),
            'role_id' => $role->role_id,
            'is_active' => true,
            'password' => static::$password ??= Hash::make('password'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this;
    }

    public function role(string $roleKey): static
    {
        return $this->state(function () use ($roleKey) {
            $role = Role::query()->firstOrCreate(
                ['role_key' => $roleKey],
                ['role_name' => Str::headline($roleKey)],
            );

            return ['role_id' => $role->role_id];
        });
    }
}
