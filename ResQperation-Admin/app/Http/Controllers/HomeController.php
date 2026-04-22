<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        // Redirect to dashboard if authenticated, otherwise redirect to login
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
        
        return redirect()->route('login');
    }
}
