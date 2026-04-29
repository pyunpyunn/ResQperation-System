<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $accounts = [
            [
                'name' => 'ResQperation Super Admin',
                'email' => 'super-admin@resqperation.local',
                'login_id' => '2024035500',
                'role' => User::ROLE_SUPER_ADMIN,
                'password' => Hash::make('temp_pass'),
            ],
            [
                'name' => 'ResQperation HQ Admin',
                'email' => 'hq-admin@resqperation.local',
                'login_id' => '0427202601',
                'role' => User::ROLE_ADMIN,
                'password' => Hash::make('temp_pass1'),
            ],
        ];

        foreach ($accounts as $account) {
            User::query()->updateOrCreate(
                ['login_id' => $account['login_id']],
                [
                    ...$account,
                    'is_active' => true,
                    'email_verified_at' => now(),
                ],
            );
        }
    }
}
