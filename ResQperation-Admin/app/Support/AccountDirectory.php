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
            ->orderByRaw("case when role = 'super_admin' then 0 else 1 end")
            ->orderBy('name')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->isSuperAdmin() ? 'Super Admin' : 'HQ Admin',
                'credential' => $user->login_id,
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
        if (! Schema::hasTable('Responder')) {
            return $this->fallbackResponderAccounts();
        }

        $rows = DB::table('Responder as responder')
            ->leftJoin('SafeTrackAccount as account', 'account.SafeTrackAccountID', '=', 'responder.SafeTrackAccountID')
            ->leftJoin('RescueTeam as team', 'team.TeamID', '=', 'responder.TeamID')
            ->select([
                'responder.ResponderID as id',
                'responder.ResponderName as name',
                'responder.Title as title',
                'team.TeamName as team_name',
                'responder.SafeTrackAccountID as safe_track_account_id',
                'account.ExternalUUID as external_uuid',
            ])
            ->orderBy('responder.ResponderName')
            ->get();

        if ($rows->isEmpty()) {
            return $this->fallbackResponderAccounts();
        }

        return $rows
            ->map(fn ($row) => [
                'id' => $row->id,
                'name' => $row->name,
                'role' => $row->title ?: 'Rescuer',
                'credential' => $row->external_uuid ?: 'Pending SafeTrack sync',
                'status' => $row->safe_track_account_id ? 'Synced' : 'Pending Sync',
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
