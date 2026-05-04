<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (app()->isLocal()) {
        return redirect()->away(env('WEB_APP_URL', 'http://127.0.0.1:5173'));
    }

    return response()->json([
        'app' => config('app.name'),
        'type' => 'ResQperation Laravel API',
        'health' => url('/api/health'),
    ]);
});
