<?php

namespace Tests\Feature;

use Tests\TestCase;

class ProfileTest extends TestCase
{
    public function test_profile_routes_are_not_registered(): void
    {
        $this->get('/profile')->assertNotFound();
        $this->patch('/profile', [])->assertNotFound();
        $this->delete('/profile', [])->assertNotFound();
    }
}
