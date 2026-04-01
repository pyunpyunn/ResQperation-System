<?php

namespace App\Http\Controllers;

use App\Models\Household;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Get real counts from your database
        $totalHouseholds = Household::count();
        
        // 2. Get the 5 most recent households to show in the table
        $recentHouseholds = Household::latest()->take(5)->get();

        // 3. Send this data to your React "Dashboard.jsx" page
        return Inertia::render('Dashboard', [
            'totalHouseholds' => $totalHouseholds,
            'households' => $recentHouseholds,
        ]);
    }
}