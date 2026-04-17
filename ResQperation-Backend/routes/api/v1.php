<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API v1 Routes
|--------------------------------------------------------------------------
|
| API v1 routes for ResQperation.
| Prefix: /api/v1
|
*/

Route::prefix('v1')->group(function () {

    // Health check endpoint
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'message' => 'ResQperation API v1 is running',
            'timestamp' => now(),
        ]);
    });

    // Protected routes (require Sanctum token)
    Route::middleware('auth:sanctum')->group(function () {
        
        // User routes
        Route::get('/user', function (Request $request) {
            return response()->json($request->user());
        });

        // Add more API routes here as you build features
        // Example structure:
        // Route::apiResource('disasters', DisasterController::class);
        // Route::apiResource('responders', ResponderController::class);
        // Route::apiResource('households', HouseholdController::class);
        // Route::apiResource('requests', RequestController::class);
    });

    // Public routes (no authentication required)
    Route::post('/auth/login', function () {
        // Authentication logic here
    });

    Route::post('/auth/register', function () {
        // Registration logic here
    });

});
