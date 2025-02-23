<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalDetails extends Model
{
  use HasFactory;

  protected $fillable = [
    'about_yourself',
    'outdoor_clothing',
    'physical_mental_illness',
    'favorite_books',
    'favorite_online_personalities',
    'device_usage_time',
    'affiliations',
    'bio_id',
  ];
  public const FILLED_MARKS_KEY = 'personal_info_filled_marks';

  /**
   * Get the bio associated with the description.
   */
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}