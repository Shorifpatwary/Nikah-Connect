<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
  /**
   * The URIs that should be excluded from CSRF verification.
   *
   * @var array<int, string>
   */
  // '/api/*',
  // '/register',
  // '/login',
  // '/logout',
  // '/email/verification-notification',
  // '/forgot-password',
  // '/reset-password',
  // '',
  protected $except = [
    '/logout',
    'email/verification-notification',
    'api/user-info',
    'api/bio/general',
    'api/bio/general/*',
    'api/bio/location',
    'api/bio/location/*',
    'api/bio/education',
    'api/bio/education/*',
    'api/bio/personal-details',
    'api/bio/personal-details/*',
    'api/bio/family-info',
    'api/bio/family-info/*',
    'api/bio/profession',
    'api/bio/profession/*',
    'api/bio/religious-activities',
    'api/bio/religious-activities/*',
    'api/bio/marriage-info',
    'api/bio/marriage-info/*',
    'api/bio/expected-partner',
    'api/bio/expected-partner/*',
    'api/bio/hidden-info',
    'api/bio/hidden-info/*',
    'api/bio/short',
    'api/bio/short/*',
    'api/bio/update-statuses-types',
    'api/coin/*',
    'api/view/*',
    'api/purchase/*',
  ];
}