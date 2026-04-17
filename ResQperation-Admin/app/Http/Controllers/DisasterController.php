<?php

namespace App\Http\Controllers;

use App\Models\DisasterEvent;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DisasterController extends Controller
{
    public function index()
    {
        $disasters = DisasterEvent::with('severity')
            ->orderByDesc('StartTime')
            ->get();

        $statusCounts = DB::table('HouseholdStatusReport')
            ->join('StatusLookup', 'HouseholdStatusReport.StatusID', '=', 'StatusLookup.StatusID')
            ->select('StatusLookup.StatusLabel', DB::raw('count(*) as total'))
            ->groupBy('StatusLookup.StatusLabel')
            ->get();

        return Inertia::render('Disasters', [
            'disasters' => $disasters,
            'statusCounts' => $statusCounts,
        ]);
    }
}
