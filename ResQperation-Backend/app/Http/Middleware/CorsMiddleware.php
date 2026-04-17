<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowed_origins = config('cors.allowed_origins', []);

        $origin = $request->header('Origin');

        if (in_array($origin, $allowed_origins) || in_array('*', $allowed_origins)) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $origin ?: '*')
                ->header('Access-Control-Allow-Methods', implode(',', config('cors.allowed_methods', ['*'])))
                ->header('Access-Control-Allow-Headers', implode(',', config('cors.allowed_headers', ['*'])))
                ->header('Access-Control-Max-Age', config('cors.max_age', 86400))
                ->header('Access-Control-Allow-Credentials', config('cors.supports_credentials', false) ? 'true' : 'false');
        }

        return $next($request);
    }
}
