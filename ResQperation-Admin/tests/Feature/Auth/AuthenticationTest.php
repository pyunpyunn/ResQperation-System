<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Services\Auth\HqAccessTokenService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'login_id' => $user->login_id,
            'password' => 'password',
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));
        $response->assertCookie(config('services.hq_auth.cookie_name'));
    }

    public function test_authenticated_requests_accept_a_signed_bearer_token(): void
    {
        $user = User::factory()->create();
        $issuedToken = app(HqAccessTokenService::class)->issueForUser(
            $user,
            Request::create('/login', 'POST', server: ['HTTP_USER_AGENT' => 'PHPUnit']),
        );

        $this->withHeader('Authorization', 'Bearer '.$issuedToken['jwt'])
            ->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('auth.user.login_id', $user->login_id)
                ->where('auth.user.role', $user->role)
            );
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'login_id' => $user->login_id,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('login_id');
    }

    public function test_super_admin_is_redirected_to_the_super_admin_dashboard(): void
    {
        $user = User::factory()->create([
            'role' => User::ROLE_SUPER_ADMIN,
        ]);

        $response = $this->post('/login', [
            'login_id' => $user->login_id,
            'password' => 'password',
        ]);

        $response->assertRedirect(route('super-admin.dashboard', absolute: false));
    }

    public function test_super_admin_dashboard_receives_the_authenticated_user_props(): void
    {
        $user = User::factory()->create([
            'role' => User::ROLE_SUPER_ADMIN,
        ]);

        $issuedToken = app(HqAccessTokenService::class)->issueForUser(
            $user,
            Request::create('/login', 'POST', server: ['HTTP_USER_AGENT' => 'PHPUnit']),
        );

        $this->withHeader('Authorization', 'Bearer '.$issuedToken['jwt'])
            ->get('/super-admin/dashboard')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('SuperAdminDashboard')
                ->where('auth.user.login_id', $user->login_id)
                ->where('auth.user.role', User::ROLE_SUPER_ADMIN)
            );
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/login');
    }
}
