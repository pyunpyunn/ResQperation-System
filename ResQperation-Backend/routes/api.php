<?php
use App\Http\Controllers\Api\HouseholdController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'ResQperation API is connected!']);
});

// This allows the mobile apps to get and send household data
Route::apiResource('households', HouseholdController::class);