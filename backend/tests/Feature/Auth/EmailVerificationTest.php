<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    public function test_email_verification_routes_are_not_registered(): void
    {
        $this->get('/verify-email')->assertNotFound();
    }
}
