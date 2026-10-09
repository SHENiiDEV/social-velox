<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class AuthValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_duplicate_email_returns_errors_to_the_inertia_form_without_creating_an_account(): void
    {
        User::factory()->create(['email' => 'player@example.com']);
        Mail::fake();

        $response = $this->from('/terms')->withHeaders([
            'X-Inertia' => 'true',
            'X-Requested-With' => 'XMLHttpRequest',
            'Accept' => 'text/html, application/xhtml+xml',
        ])->post('/api/auth/register', [
            'name' => 'Jane',
            'surname' => 'Doe',
            'email' => 'player@example.com',
            'password' => 'secure-password',
            'password_confirmation' => 'secure-password',
            'phone_number' => '+49123456789',
            'date_of_birth' => '1990-01-01',
            'street_address' => 'Example Street 1',
            'city' => 'Berlin',
            'country' => 'Germany',
            'postal_code' => '10115',
            'agreed_to_terms' => true,
        ]);

        $response->assertRedirect('/terms')->assertSessionHasErrors([
            'email' => 'An account with this email already exists. Sign in or reset your password.',
        ]);
        $this->assertDatabaseCount('users', 1);
        $this->assertGuest();
        Mail::assertNothingSent();
    }

    public function test_welcome_email_does_not_claim_the_player_was_verified(): void
    {
        $user = User::factory()->make(['game_balance' => 0]);

        $this->view('emails.welcome_registration', ['user' => $user])
            ->assertSeeText('Your account has been successfully created.')
            ->assertDontSeeText('verified')
            ->assertDontSeeText('sweepstakes');
    }

    public function test_missing_login_fields_return_errors_to_the_inertia_form(): void
    {
        $response = $this->from('/terms')->withHeaders([
            'X-Inertia' => 'true',
            'X-Requested-With' => 'XMLHttpRequest',
        ])->post('/api/auth/login', []);

        $response->assertRedirect('/terms')->assertSessionHasErrors(['email', 'password']);
        $this->assertGuest();
    }

    public function test_json_api_validation_still_returns_422(): void
    {
        $this->postJson('/api/auth/register', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'password']);
    }

    public function test_api_validation_returns_json_without_an_accept_header(): void
    {
        $this->post('/api/auth/login', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'password']);
    }
}
