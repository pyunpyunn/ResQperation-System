<?php

namespace App\Http\Controllers;

use App\Support\AccountDirectory;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Sanctum\PersonalAccessToken;

class SuperAdminController extends Controller
{
    public function __construct(
        private readonly AccountDirectory $accountDirectory,
    ) {
    }

    public function index(): Response
    {
        $hqAdmins = $this->accountDirectory->hqAdminAccounts();
        $responderAccounts = $this->accountDirectory->responderAccounts();

        return Inertia::render('SuperAdminDashboard', [
            'summaryCards' => [
                ['label' => 'HQ personnel', 'value' => (string) count($hqAdmins)],
                ['label' => 'Super-admin accounts', 'value' => (string) collect($hqAdmins)->where('role', 'Super Admin')->count()],
                ['label' => 'HQ admin accounts', 'value' => (string) collect($hqAdmins)->where('role', 'HQ Admin')->count()],
                ['label' => 'Responder accounts', 'value' => (string) count($responderAccounts)],
            ],
            'hqAdmins' => $hqAdmins,
            'responderAccounts' => array_slice($responderAccounts, 0, 5),
            'tokenOverview' => [
                ['label' => 'Active access tokens', 'value' => (string) PersonalAccessToken::query()->count()],
                ['label' => 'Expiring within 2 hours', 'value' => (string) PersonalAccessToken::query()->whereNotNull('expires_at')->where('expires_at', '<=', now()->addHours(2))->count()],
                ['label' => 'Role auto-detection', 'value' => 'Enabled'],
            ],
            'securityChecklist' => [
                'Role-based redirect after credential verification',
                'Signed browser token issued only after the server validates the ID and password',
                'Protected pages re-check the token and role before rendering data',
                'Super-admin access is isolated from the regular HQ admin operations view',
            ],
        ]);
    }

    public function accounts(): Response
    {
        $hqAdmins = $this->accountDirectory->hqAdminAccounts();
        $responderAccounts = $this->accountDirectory->responderAccounts();

        return Inertia::render('Accounts', [
            'pageTitle' => 'All Department Accounts',
            'pageDescription' => 'Super-admin oversight for HQ personnel, temporary admin access, and all responder mobile accounts.',
            'summaryCards' => [
                ['label' => 'HQ personnel', 'value' => (string) count($hqAdmins)],
                ['label' => 'Responder accounts', 'value' => (string) count($responderAccounts)],
                ['label' => 'Total accounts', 'value' => (string) (count($hqAdmins) + count($responderAccounts))],
                ['label' => 'Active tokens', 'value' => (string) PersonalAccessToken::query()->count()],
            ],
            'accountGroups' => [
                [
                    'key' => 'hq-admins',
                    'title' => 'HQ admin personnel',
                    'description' => 'Command center users of the web dashboard, including the temporary super-admin and HQ admin accounts.',
                    'items' => $hqAdmins,
                ],
                [
                    'key' => 'rescuers',
                    'title' => 'On-site rescuer accounts',
                    'description' => 'Accounts that support the rescuer mobile application and field deployment operations.',
                    'items' => $responderAccounts,
                ],
            ],
            'roleMatrix' => [
                [
                    'title' => 'Super Admin',
                    'description' => 'Can review all department accounts, including HQ personnel and every mobile rescuer account.',
                ],
                [
                    'title' => 'HQ Admin',
                    'description' => 'Can work inside the current operations dashboard and manage on-site rescuer related modules.',
                ],
            ],
            'securityNotes' => [
                ['label' => 'Login identifier', 'value' => 'Numeric administrator ID'],
                ['label' => 'Access token', 'value' => 'Signed JWT stored in a secure browser cookie'],
                ['label' => 'Validation path', 'value' => 'Verify credentials, issue token, validate token, then render protected view'],
            ],
        ]);
    }
}
