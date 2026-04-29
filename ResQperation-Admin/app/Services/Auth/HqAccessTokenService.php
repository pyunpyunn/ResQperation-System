<?php

namespace App\Services\Auth;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Cookie;
use Throwable;

class HqAccessTokenService
{
    public const WEB_ABILITY = 'hq-web';

    public function __construct(
        private readonly JwtTokenService $jwtTokenService,
    ) {
    }

    /**
     * @return array{jwt: string, expires_at: CarbonInterface, access_token: PersonalAccessToken}
     */
    public function issueForUser(User $user, Request $request): array
    {
        $user->tokens()
            ->where('name', 'like', 'hq-web%')
            ->delete();

        $expiresAt = now()->addMinutes((int) config('services.hq_auth.ttl_minutes', 480));
        $abilities = [
            self::WEB_ABILITY,
            'role:'.$user->role,
        ];
        $tokenName = $request->userAgent()
            ? 'hq-web:'.substr($request->userAgent(), 0, 80)
            : 'hq-web:browser';
        $newToken = $user->createToken($tokenName, $abilities, $expiresAt);

        $jwt = $this->jwtTokenService->encode([
            'iss' => (string) config('services.hq_auth.issuer', config('app.url', 'resqperation-hq')),
            'sub' => (string) $user->getKey(),
            'token_id' => $newToken->accessToken->getKey(),
            'login_id' => $user->login_id,
            'role' => $user->role,
            'iat' => now()->timestamp,
            'exp' => $expiresAt->timestamp,
        ]);

        return [
            'jwt' => $jwt,
            'expires_at' => $expiresAt,
            'access_token' => $newToken->accessToken,
        ];
    }

    /**
     * @return array{user: User, access_token: PersonalAccessToken, jwt: string, payload: object}|null
     */
    public function resolveFromRequest(Request $request): ?array
    {
        $jwt = $this->extractTokenFromRequest($request);

        if (! $jwt) {
            return null;
        }

        try {
            $payload = $this->jwtTokenService->decode($jwt);
        } catch (Throwable) {
            return null;
        }

        $expectedIssuer = (string) config('services.hq_auth.issuer', config('app.url', 'resqperation-hq'));

        if (! empty($payload->iss) && $payload->iss !== $expectedIssuer) {
            return null;
        }

        $tokenId = isset($payload->token_id) ? (int) $payload->token_id : null;
        $userId = isset($payload->sub) ? (int) $payload->sub : null;
        $role = isset($payload->role) ? (string) $payload->role : null;

        if (! $tokenId || ! $userId || ! $role) {
            return null;
        }

        $accessToken = PersonalAccessToken::query()->find($tokenId);

        if (! $accessToken) {
            return null;
        }

        if ($accessToken->expires_at && $accessToken->expires_at->isPast()) {
            $accessToken->delete();

            return null;
        }

        $tokenable = $accessToken->tokenable;

        if (! $tokenable instanceof User) {
            return null;
        }

        if ((int) $tokenable->getKey() !== $userId || $tokenable->role !== $role || ! $tokenable->is_active) {
            return null;
        }

        if (! $accessToken->can(self::WEB_ABILITY) || ! $accessToken->can('role:'.$tokenable->role)) {
            return null;
        }

        $tokenable->withAccessToken($accessToken);
        $accessToken->forceFill([
            'last_used_at' => now(),
        ])->save();

        return [
            'user' => $tokenable,
            'access_token' => $accessToken,
            'jwt' => $jwt,
            'payload' => $payload,
        ];
    }

    public function revokeFromRequest(Request $request): void
    {
        $context = $this->resolveFromRequest($request);

        if ($context) {
            $context['access_token']->delete();
        }
    }

    public function authCookie(string $jwt, CarbonInterface $expiresAt): Cookie
    {
        return cookie(
            name: (string) config('services.hq_auth.cookie_name', 'resq_hq_access'),
            value: $jwt,
            minutes: max(1, (int) ceil(now()->diffInSeconds($expiresAt, false) / 60)),
            path: '/',
            domain: null,
            secure: $this->shouldUseSecureCookie(),
            httpOnly: true,
            raw: false,
            sameSite: 'lax',
        );
    }

    public function forgetCookie(): Cookie
    {
        return cookie()->forget((string) config('services.hq_auth.cookie_name', 'resq_hq_access'));
    }

    public function extractTokenFromRequest(Request $request): ?string
    {
        return $request->bearerToken()
            ?: $request->cookie((string) config('services.hq_auth.cookie_name', 'resq_hq_access'));
    }

    private function shouldUseSecureCookie(): bool
    {
        return app()->isProduction() || str_starts_with((string) config('app.url'), 'https://');
    }
}
