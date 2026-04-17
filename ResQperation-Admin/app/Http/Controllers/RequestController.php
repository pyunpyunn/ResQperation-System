<?php

namespace App\Http\Controllers;

use App\Models\IncomingRequest;
use Inertia\Inertia;

class RequestController extends Controller
{
    public function index()
    {
        $requests = IncomingRequest::with(['status', 'requestType'])
            ->orderByDesc('created_at')
            ->take(25)
            ->get();

        return Inertia::render('Requests', [
            'requests' => $requests,
        ]);
    }
}
