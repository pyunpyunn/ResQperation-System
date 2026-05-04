<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class HouseholdController extends Controller
{
    /**
     * 1. LOGIN SYSTEM (For SafeTrack Integration)
     * This checks if the resident exists in the 'users' table.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid SafeTrack credentials.'
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => [
                'id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ], 200);
    }

    /**
     * 2. FETCH ALL (For the Rescuer App Dashboard)
     */
    public function index()
    {
        // We use plural $households because it returns a LIST
        $households = Household::all();

        return response()->json([
            'status' => 'success',
            'count' => $households->count(),
            'data' => $households
        ], 200);
    }

    /**
     * 3. GEOTAG & SAVE (For the Resident App Onboarding)
     * This saves the specific location details you requested.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'household_name' => 'required|string|max:100',
            'contact_number' => 'nullable|string|max:50',
            'emergency_contact' => 'nullable|string|max:50',
        ]);

        $household = Household::create([
            'household_id' => (string) Str::uuid(),
            'household_code' => 'HH-'.now()->format('YmdHis'),
            'household_name' => $validated['household_name'],
            'contact_number' => $validated['contact_number'] ?? null,
            'emergency_contact' => $validated['emergency_contact'] ?? null,
            'created_by' => $request->user()?->getKey() ?? 'SYSTEM',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Home successfully geotagged!',
            'data' => $household
        ], 201);
    }
}
