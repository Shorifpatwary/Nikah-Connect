<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HiddenInfo extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'family_members_name',
    'location',
    'current_parent',
    'parent_mobile',
    'permanent_address_map_location',
    'present_address_map_location',
    'email',
    'social_links',

    'bio_id',
  ];

  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}