<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use App\Models\DisasterEvent;
use App\Models\Household;
use App\Models\IncomingRequest;
use App\Models\Responder;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
=======
use App\Models\Household;
use Inertia\Inertia;
use Illuminate\Http\Request;
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc

class DashboardController extends Controller
{
    public function index()
    {
<<<<<<< HEAD
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
=======
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
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
