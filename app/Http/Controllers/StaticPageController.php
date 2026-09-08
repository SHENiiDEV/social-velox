<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Static/Terms');
    }

    public function privacy(): Response
    {
        return Inertia::render('Static/Privacy');
    }

    public function responsibleGaming(): Response
    {
        return Inertia::render('Static/ResponsibleGaming');
    }

    public function fairPlay(): Response
    {
        return Inertia::render('Static/FairPlay');
    }

    public function kycAml(): Response
    {
        return Inertia::render('Static/KycAml');
    }
}
