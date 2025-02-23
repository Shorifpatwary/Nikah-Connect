<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationSection extends Model
{
  use HasFactory;

  protected $fillable = [
    'permanent_address',
    'present_address',
    'relocate_plan',
    'childhood_address',
    'bio_id',
  ];
  public const FILLED_MARKS_KEY = 'location_filled_marks';

  /**
   * Get the bio associated with the description.
   */
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}