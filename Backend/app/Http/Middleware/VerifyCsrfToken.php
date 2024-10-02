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
    'api/bio/location',
  ];
}