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
        if (! Schema::hasTable('households')) {
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
        $activeDisasters = Schema::hasTable('disaster_events') ? DisasterEvent::whereNull('ended_at')->count() : 0;
        $openRequests = Schema::hasTable('resource_requests') ? IncomingRequest::count() : 0;

        $recentResponders = [];
        $activeEvents = [];
        $statusBreakdown = [];

        if (Schema::hasTable('responders')) {
            $recentResponders = Responder::with('team')->orderBy('full_name')->take(5)->get();
        }

        if (Schema::hasTable('disaster_events')) {
            $activeEvents = DisasterEvent::with('type.severity')
                ->whereNull('ended_at')
                ->orderByDesc('started_at')
                ->take(4)
                ->get();
        }

        if (Schema::hasTable('household_disasters')) {
            $statusBreakdown = DB::table('household_disasters')
                ->join('household_status', 'household_disasters.initial_status_id', '=', 'household_status.status_id')
                ->select('household_status.status_label', DB::raw('count(*) as total'))
                ->groupBy('household_status.status_label')
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
