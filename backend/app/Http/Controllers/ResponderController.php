<?php

namespace App\Http\Controllers;

use App\Models\Responder;
use Inertia\Inertia;

class ResponderController extends Controller
{
    public function index()
    {
        $responders = Responder::with('team')
            ->orderBy('full_name')
            ->get();

        return Inertia::render('Responders', [
            'responders' => $responders,
        ]);
    }
}
