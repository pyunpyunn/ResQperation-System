<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_mobile_user_can_authenticate_with_api_credentials(): void
    {
        $user = User::factory()
            ->role(User::ROLE_RESCUER)
            ->create([
                'username' => 'RTR-TEST',
            ]);

        $response = $this->postJson('/api/auth/login', [
            'login_id' => 'RTR-TEST',
            'password' => 'password',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('user.id', $user->user_id)
            ->assertJsonPath('user.login_id', 'RTR-TEST')
            ->assertJsonPath('user.role', User::ROLE_RESCUER)
            ->assertJsonStructure([
                'token',
                'user' => ['id', 'name', 'login_id', 'email', 'role', 'role_name'],
            ]);
    }

    public function test_mobile_login_rejects_invalid_password(): void
    {
        User::factory()->create([
            'username' => 'RTR-TEST',
        ]);

        $this->postJson('/api/auth/login', [
            'login_id' => 'RTR-TEST',
            'password' => 'wrong-password',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('login_id');
    }

    public function test_authenticated_api_request_accepts_sanctum_bearer_token(): void
    {
        $user = User::factory()
            ->role(User::ROLE_HOUSEHOLD_RESIDENT)
            ->create([
                'username' => 'HHR-TEST',
            ]);

        $token = $user->createToken('test-client')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.id', $user->user_id)
            ->assertJsonPath('user.login_id', 'HHR-TEST')
            ->assertJsonPath('user.role', User::ROLE_HOUSEHOLD_RESIDENT);
    }

    public function test_users_can_logout_from_the_api(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-client');

        $this->withToken($token->plainTextToken)
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logged out');

        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $token->accessToken->id,
        ]);
    }
}
