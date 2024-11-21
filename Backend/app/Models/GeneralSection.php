<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSection extends Model
{
  use HasFactory;

  protected $fillable = [
    'gender',
    'marital_status',
    'birth_date',
    'height',
    'weight',
    'complexion',
    'blood_group',
    'language_skills',
    'location_id',
    'bio_id',
  ];

  /**
   * Get the location associated with the general section.
   */
  public function location()
  {
    return $this->belongsTo(Location::class);
  }

  /**
   * Get the bio associated with the general section.
   */
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }

  protected $casts = [
    'height' => 'float',  // Always treat 'height' as a float
    'weight' => 'integer',  // Always treat 'weight' as an integer
    'location_id' => 'integer',  // Always treat 'weight' as an integer
  ];
}