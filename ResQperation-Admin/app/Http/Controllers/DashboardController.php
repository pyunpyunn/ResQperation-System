<?php

namespace App\Http\Controllers;

use App\Models\Household;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    public function index()
    {
        // Check if the household table exists
        if (Schema::hasTable('household')) {
            $totalHouseholds = Household::count();
            $recentHouseholds = Household::latest()->take(5)->get();
        } else {
            $totalHouseholds = 0;
            $recentHouseholds = [];
        }

        // Send this data to your React "Dashboard.jsx" page
        return Inertia::render('Dashboard', [
            'totalHouseholds' => $totalHouseholds,
            'households' => $recentHouseholds,
        ]);
    }
}