<?php

namespace App\Http\Controllers;

use App\Models\DisasterEvent;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DisasterController extends Controller
{
    public function index()
    {
        $disasters = DisasterEvent::with('type.severity')
            ->orderByDesc('started_at')
            ->get();

        $statusCounts = DB::table('household_disasters')
            ->join('household_status', 'household_disasters.initial_status_id', '=', 'household_status.status_id')
            ->select('household_status.status_label', DB::raw('count(*) as total'))
            ->groupBy('household_status.status_label')
            ->get();

        return Inertia::render('Disasters', [
            'disasters' => $disasters,
            'statusCounts' => $statusCounts,
        ]);
    }
}
