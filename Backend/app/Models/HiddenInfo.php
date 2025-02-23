<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HiddenInfo extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'email',
    'location',
    'family_members_name',
    'current_parent',
    'parent_mobile',
    'permanent_address_map_location',
    'present_address_map_location',
    'social_links',
    'documents_link',

    'bio_id',
  ];
  public const FILLED_MARKS_KEY = 'hidden_info_filled_marks';

  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}