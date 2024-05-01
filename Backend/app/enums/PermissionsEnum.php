<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    // case NAME_IN_APP = 'name-in-app';

  case ALL = '*';
  case ALL_FOR_USER = '*.user';
  case CREATE_USER = 'create-user';
  case DELETE_USER = 'delete-user';
  case VIEW_USER = 'view-user';
  case EDIT_USER = 'edit-user';


  // extra helper to allow for greater customization of displayed values, without disclosing the name/value data directly
  public function label(): string
  {
    return match ($this) {
      static::ALL => 'All',
      static::ALL_FOR_USER => 'All For User',
      static::CREATE_USER => 'Create User',
      static::DELETE_USER => 'Delete User',
      static::VIEW_USER =>  'View User',
      static::EDIT_USER => 'Edit User',
    };
  }
}
