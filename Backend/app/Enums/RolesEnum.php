<?php

namespace App\Enums;

enum RolesEnum: string
{
    // case NAME_IN_APP = 'name-in-app';

  case SUPER_ADMIN = 'super-admin';
  case ADMIN = 'admin';
  case WRITER = 'writer';
  case EDITOR = 'editor';
  case USER_MANAGER = 'user-manager';
  case USER = 'user';
  // extra helper to allow for greater customization of displayed values, without disclosing the name/value data directly
  public function label(): string
  {
    return match ($this) {
      static::SUPER_ADMIN => 'Super Admin',
      static::ADMIN => 'Admin',
      static::WRITER => 'Writers',
      static::EDITOR => 'Editors',
      static::USER_MANAGER => 'User Managers',
      static::USER => 'User',
    };
  }
}
