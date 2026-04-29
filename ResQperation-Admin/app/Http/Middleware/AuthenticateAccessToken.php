<?php

namespace App\Http\Middleware;

use App\Services\Auth\HqAccessTokenService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAccessToken
{
    public function __construct(
        private readonly HqAccessTokenService $tokenService,
    ) {
    }

    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('web')->check()) {
            return $next($request);
        }

        $context = $this->tokenService->resolveFromRequest($request);

        if (! $context) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            return redirect()
                ->route('login')
                ->withCookie($this->tokenService->forgetCookie())
                ->with('status', 'Your access token has expired. Please log in again.');
        }

        $user = $context['user'];

        Auth::guard('web')->setUser($user);
        $request->setUserResolver(fn () => $user);
        $request->attributes->set('auth.access_token', $context['access_token']);

        return $next($request);
    }
}
