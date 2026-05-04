<?php

namespace App\Http\Middleware;

use App\Services\Auth\HqAccessTokenService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                return redirect()->intended(route(Auth::guard($guard)->user()->landingRouteName()));
            }
        }

        $context = app(HqAccessTokenService::class)->resolveFromRequest($request);

        if ($context) {
            $user = $context['user'];

            Auth::guard('web')->setUser($user);
            $request->setUserResolver(fn () => $user);

            return redirect()->intended(route($user->landingRouteName()));
        }

        return $next($request);
    }
}
