<?php

use App\Http\Controllers\Api\HouseholdController;
use Illuminate\Http\Request;
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

// Household routes
Route::apiResource('households', HouseholdController::class);
