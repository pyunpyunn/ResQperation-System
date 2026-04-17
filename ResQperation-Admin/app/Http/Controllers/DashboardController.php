<?php

namespace App\Http\Controllers;

use App\Models\DisasterEvent;
use App\Models\Household;
use App\Models\IncomingRequest;
use App\Models\Responder;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalHouseholds = Household::count();
        $totalResponders = Responder::count();
        $activeDisasters = DisasterEvent::whereNull('EndTime')->count();
        $openRequests = IncomingRequest::count();

        $recentHouseholds = Household::orderByDesc('created_at')->take(5)->get();
        $recentResponders = Responder::with('team')->orderBy('ResponderName')->take(5)->get();
        $activeEvents = DisasterEvent::with('severity')
            ->whereNull('EndTime')
            ->orderByDesc('StartTime')
            ->take(4)
            ->get();

        $statusBreakdown = DB::table('HouseholdStatusReport')
            ->join('StatusLookup', 'HouseholdStatusReport.StatusID', '=', 'StatusLookup.StatusID')
            ->select('StatusLookup.StatusLabel', DB::raw('count(*) as total'))
            ->groupBy('StatusLookup.StatusLabel')
            ->get();

        return Inertia::render('Dashboard', [
            'totalHouseholds' => $totalHouseholds,
            'totalResponders' => $totalResponders,
            'activeDisasters' => $activeDisasters,
            'openRequests' => $openRequests,
            'recentHouseholds' => $recentHouseholds,
            'recentResponders' => $recentResponders,
            'activeEvents' => $activeEvents,
            'statusBreakdown' => $statusBreakdown,
        ]);
    }
}
