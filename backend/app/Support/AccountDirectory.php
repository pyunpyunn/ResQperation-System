<?php

namespace App\Support;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AccountDirectory
{
    /**
     * @return array<int, array<string, string|int|null>>
     */
    public function hqAdminAccounts(): array
    {
        return User::query()
            ->with('role')
            ->leftJoin('roles', 'roles.role_id', '=', 'users.role_id')
            ->select('users.*')
            ->orderByRaw("case when roles.role_key = 'super_admin' then 0 else 1 end")
            ->orderBy('name')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->user_id,
                'name' => $user->name,
                'role' => $user->isSuperAdmin() ? 'Super Admin' : 'HQ Admin',
                'credential' => $user->username,
                'status' => $user->is_active ? 'Active' : 'Disabled',
                'detail' => $user->email,
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string|int|null>>
     */
    public function responderAccounts(): array
    {
        if (! Schema::hasTable('responders')) {
            return $this->fallbackResponderAccounts();
        }

        $rows = DB::table('responders as responder')
            ->leftJoin('rescue_teams as team', 'team.team_id', '=', 'responder.team_id')
            ->select([
                'responder.responder_id as id',
                'responder.full_name as name',
                'responder.title as title',
                'team.team_name as team_name',
                'responder.username as username',
                'responder.is_validated as is_validated',
            ])
            ->orderBy('responder.full_name')
            ->get();

        if ($rows->isEmpty()) {
            return $this->fallbackResponderAccounts();
        }

        return $rows
            ->map(fn ($row) => [
                'id' => $row->id,
                'name' => $row->name,
                'role' => $row->title ?: 'Rescuer',
                'credential' => $row->username,
                'status' => $row->is_validated ? 'Validated' : 'Pending Validation',
                'detail' => $row->team_name ?: 'Unassigned team',
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, string|int>>
     */
    private function fallbackResponderAccounts(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Juan dela Cruz',
                'role' => 'Field Rescuer',
                'credential' => 'RTR-24001',
                'status' => 'Mobile-ready',
                'detail' => 'Team Alpha',
            ],
            [
                'id' => 2,
                'name' => 'Maria Santos',
                'role' => 'Dispatcher',
                'credential' => 'RTR-24002',
                'status' => 'Mobile-ready',
                'detail' => 'Team Bravo',
            ],
            [
                'id' => 3,
                'name' => 'Pedro Reyes',
                'role' => 'Paramedic',
                'credential' => 'RTR-24003',
                'status' => 'Pending Sync',
                'detail' => 'Team Charlie',
            ],
        ];
    }
}
