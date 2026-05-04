<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $roles = collect([
            [User::ROLE_SUPER_ADMIN, 'Super Admin'],
            [User::ROLE_ADMIN, 'HQ Admin'],
            [User::ROLE_RESCUER, 'Rescuer'],
            [User::ROLE_HOUSEHOLD_RESIDENT, 'Household Resident'],
        ])->mapWithKeys(function (array $role) {
            $record = Role::query()->updateOrCreate(
                ['role_key' => $role[0]],
                ['role_name' => $role[1]],
            );

            return [$role[0] => $record->role_id];
        });

        $accounts = [
            [
                'user_id' => 'USR-SUPER-2024035500',
                'name' => 'ResQperation Super Admin',
                'email' => 'super-admin@resqperation.local',
                'username' => '2024035500',
                'role_id' => $roles[User::ROLE_SUPER_ADMIN],
                'password' => Hash::make('temp_pass'),
            ],
            [
                'user_id' => 'USR-HQ-0427202601',
                'name' => 'ResQperation HQ Admin',
                'email' => 'hq-admin@resqperation.local',
                'username' => '0427202601',
                'role_id' => $roles[User::ROLE_ADMIN],
                'password' => Hash::make('temp_pass1'),
            ],
            [
                'user_id' => 'USR-RESCUER-RTR-24001',
                'name' => 'Sample Field Rescuer',
                'email' => 'rescuer@resqperation.local',
                'username' => 'RTR-24001',
                'role_id' => $roles[User::ROLE_RESCUER],
                'password' => Hash::make('temp_rescuer'),
            ],
            [
                'user_id' => 'USR-HOUSEHOLD-HHR-24001',
                'name' => 'Sample Household Resident',
                'email' => 'resident@resqperation.local',
                'username' => 'HHR-24001',
                'role_id' => $roles[User::ROLE_HOUSEHOLD_RESIDENT],
                'password' => Hash::make('temp_resident'),
            ],
        ];

        foreach ($accounts as $account) {
            User::query()->updateOrCreate(
                ['username' => $account['username']],
                [
                    ...$account,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }
}
