<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyInfoSection extends Model
{
  use HasFactory;

  protected $fillable = [
    'family_members_info',
    'uncles_info',
    'descent',
    'economic_status',
    'economic_status_details',
    'bio_id',
  ];

  public const FILLED_MARKS_KEY = 'family_filled_marks';
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
  protected $casts = [
    'economic_status' => 'string',
  ];
}