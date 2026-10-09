<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LegalPagesTest extends TestCase
{
    public function test_terms_include_the_current_registration_restrictions(): void
    {
        $this->get('/terms')->assertInertia(fn (Assert $page) => $page
            ->component('Static/Terms')
            ->has('excludedCountries', 19)
            ->where('excludedCountries.0', 'Sudan')
            ->where('excludedCountries.18', 'Zimbabwe')
        );
    }

    public function test_legacy_terms_alias_remains_accessible(): void
    {
        $this->get('/legal/terms')->assertInertia(fn (Assert $page) => $page
            ->component('Static/Terms')
            ->has('excludedCountries', 19)
        );
    }

    public function test_removed_kyc_policy_permanently_redirects_to_terms(): void
    {
        $this->get('/kyc-aml')->assertMovedPermanently()->assertRedirect('/terms');
    }
}
