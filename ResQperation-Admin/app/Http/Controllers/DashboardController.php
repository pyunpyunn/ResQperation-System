<?php

namespace App\Http\Controllers;

use App\Models\DisasterEvent;
use App\Models\Household;
use App\Models\IncomingRequest;
use App\Models\Responder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Check if required tables exist before querying
        if (!Schema::hasTable('household')) {
            return Inertia::render('Dashboard', [
                'totalHouseholds' => 0,
                'households' => [],
                'totalResponders' => 0,
                'activeDisasters' => 0,
                'openRequests' => 0,
            ]);
        }

        $totalHouseholds = Household::count();
        $recentHouseholds = Household::orderByDesc('created_at')->take(5)->get();
        
        // Get additional data if tables exist
        $totalResponders = Schema::hasTable('responders') ? Responder::count() : 0;
        $activeDisasters = Schema::hasTable('DisasterEvent') ? DisasterEvent::whereNull('EndTime')->count() : 0;
        $openRequests = Schema::hasTable('IncomingRequest') ? IncomingRequest::count() : 0;

        $recentResponders = [];
        $activeEvents = [];
        $statusBreakdown = [];

        if (Schema::hasTable('responders')) {
            $recentResponders = Responder::with('team')->orderBy('ResponderName')->take(5)->get();
        }

        if (Schema::hasTable('DisasterEvent')) {
            $activeEvents = DisasterEvent::with('severity')
                ->whereNull('EndTime')
                ->orderByDesc('StartTime')
                ->take(4)
                ->get();
        }

        if (Schema::hasTable('HouseholdStatusReport')) {
            $statusBreakdown = DB::table('HouseholdStatusReport')
                ->join('StatusLookup', 'HouseholdStatusReport.StatusID', '=', 'StatusLookup.StatusID')
                ->select('StatusLookup.StatusLabel', DB::raw('count(*) as total'))
                ->groupBy('StatusLookup.StatusLabel')
                ->get();
        }

        return Inertia::render('Dashboard', [
            'totalHouseholds' => $totalHouseholds,
            'households' => $recentHouseholds,
            'totalResponders' => $totalResponders,
            'activeDisasters' => $activeDisasters,
            'openRequests' => $openRequests,
            'recentResponders' => $recentResponders,
            'activeEvents' => $activeEvents,
            'statusBreakdown' => $statusBreakdown,
        ]);
    }
}
