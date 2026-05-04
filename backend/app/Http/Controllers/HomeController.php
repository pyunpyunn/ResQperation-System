<?php

namespace App\Http\Controllers;

use App\Services\Auth\HqAccessTokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function __construct(
        private readonly HqAccessTokenService $tokenService,
    ) {
    }

    public function index(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route(Auth::user()->landingRouteName());
        }

        $context = $this->tokenService->resolveFromRequest($request);

        if ($context) {
            return redirect()->route($context['user']->landingRouteName());
        }

        return redirect()->route('login');
    }
}
