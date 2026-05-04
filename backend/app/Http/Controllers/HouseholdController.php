<?php

namespace App\Http\Controllers;

use App\Models\Household;
use Inertia\Inertia;

class HouseholdController extends Controller
{
    public function index()
    {
        $households = Household::withCount('members')
            ->orderByDesc('created_at')
            ->take(25)
            ->get();

        return Inertia::render('Households', [
            'households' => $households,
        ]);
    }
}
