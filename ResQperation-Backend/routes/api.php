<?php

use App\Http\Controllers\Api\HouseholdController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
| API Versions:
| - v1: Current production API
|
| Base URL: /api
|
*/

// Load v1 routes
require __DIR__ . '/api/v1.php';

// Legacy endpoints (for backward compatibility)
// TODO: Migrate these to /api/v1/ routes

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'ResQperation API is connected!']);
});

Route::get('/health', function () {
    try {
        DB::connection()->getPdo();

        return response()->json([
            'status' => 'ok',
            'database' => 'ok',
            'app' => config('app.name'),
            'timestamp' => now()->toIso8601String(),
        ]);
    } catch (\Throwable $exception) {
        return response()->json([
            'status' => 'degraded',
            'database' => 'error',
            'app' => config('app.name'),
            'timestamp' => now()->toIso8601String(),
        ], 503);
    }
});

// Household routes - allows mobile apps to get and send household data
Route::apiResource('households', HouseholdController::class);
