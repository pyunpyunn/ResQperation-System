<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class RateLimitMiddleware
{
    /**
     * Create a new middleware instance.
     */
    public function __construct(protected RateLimiter $limiter)
    {
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $limit = '60,1'): Response
    {
        if (!config('api.rate_limit.enabled')) {
            return $next($request);
        }

        [$requests, $period] = explode(',', $limit);
        $key = $this->getKey($request);

        if ($this->limiter->tooManyAttempts($key, (int) $requests)) {
            return response()->json([
                'error' => 'Too many requests',
                'message' => 'You have exceeded the rate limit. Please try again later.',
                'retry_after' => $this->limiter->availableIn($key),
            ], 429)
                ->header('Retry-After', $this->limiter->availableIn($key))
                ->header('X-RateLimit-Limit', $requests)
                ->header('X-RateLimit-Remaining', 0);
        }

        $this->limiter->hit($key, (int) $period * 60);

        $response = $next($request);

        return $response
            ->header('X-RateLimit-Limit', $requests)
            ->header('X-RateLimit-Remaining', $this->limiter->attempts($key) ? max(0, (int) $requests - $this->limiter->attempts($key)) : $requests);
    }

    /**
     * Get rate limit key.
     */
    protected function getKey(Request $request): string
    {
        $user = $request->user();

        if ($user) {
            return "api_limit:{$user->id}";
        }

        return 'api_limit:' . $request->ip();
    }
}
