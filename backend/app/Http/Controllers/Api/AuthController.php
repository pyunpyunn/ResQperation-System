<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'login_id' => ['required', 'string', 'max:100'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()
            ->with('role')
            ->where('username', $credentials['login_id'])
            ->first();

        if (! $user || ! $user->is_active || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login_id' => trans('auth.failed'),
            ]);
        }

        return response()->json([
            'token' => $user->createToken('resqperation-client')->plainTextToken,
            'user' => $this->serializeUser($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $this->serializeUser($request->user()->loadMissing('role')),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out']);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->user_id,
            'name' => $user->name,
            'login_id' => $user->username,
            'email' => $user->email,
            'role' => $user->roleKey(),
            'role_name' => $user->role?->role_name,
        ];
    }
}
