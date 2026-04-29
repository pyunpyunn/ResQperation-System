<?php

namespace App\Http\Controllers;

use App\Support\AccountDirectory;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function __construct(
        private readonly AccountDirectory $accountDirectory,
    ) {
    }

    public function index(): Response
    {
        $responderAccounts = $this->accountDirectory->responderAccounts();
        $assignedTeams = collect($responderAccounts)
            ->filter(fn (array $account) => $account['detail'] !== 'Unassigned team')
            ->count();
        $syncedAccounts = collect($responderAccounts)
            ->filter(fn (array $account) => in_array($account['status'], ['Synced', 'Mobile-ready'], true))
            ->count();

        return Inertia::render('Accounts', [
            'pageTitle' => 'Responder Accounts',
            'pageDescription' => 'HQ admin access is limited to the responder mobile accounts and field-ready account monitoring modules.',
            'summaryCards' => [
                ['label' => 'Responder accounts', 'value' => (string) count($responderAccounts)],
                ['label' => 'Synced accounts', 'value' => (string) $syncedAccounts],
                ['label' => 'Assigned teams', 'value' => (string) $assignedTeams],
                ['label' => 'Access scope', 'value' => 'HQ Admin'],
            ],
            'accountGroups' => [
                [
                    'key' => 'rescuers',
                    'title' => 'On-site rescuer accounts',
                    'description' => 'Accounts used by field rescuers and responders in the mobile application.',
                    'items' => $responderAccounts,
                ],
            ],
            'roleMatrix' => [
                [
                    'title' => 'HQ Admin',
                    'description' => 'Uses the current operations dashboard, modules, and rescuer account monitoring tools.',
                ],
                [
                    'title' => 'Super Admin',
                    'description' => 'Uses a separate oversight console to review every HQ and responder account in the department.',
                ],
            ],
            'securityNotes' => [
                ['label' => 'Login credential', 'value' => 'Administrator ID + password'],
                ['label' => 'Role detection', 'value' => 'Automatic after server-side verification'],
                ['label' => 'Protected requests', 'value' => 'Signed token cookie validated on every protected page'],
            ],
        ]);
    }
}
