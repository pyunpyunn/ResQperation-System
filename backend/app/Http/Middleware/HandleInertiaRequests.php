<?php

namespace App\Http\Middleware;

use App\Services\Auth\HqAccessTokenService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if (! $user) {
            $context = app(HqAccessTokenService::class)->resolveFromRequest($request);

            if ($context) {
                $user = $context['user'];
                $request->setUserResolver(fn () => $user);
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->user_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'login_id' => $user->username,
                    'role' => $user->roleKey(),
                    'is_active' => $user->is_active,
                    'landing_route' => $user->landingRouteName(),
                ] : null,
            ],
        ];
    }
}
