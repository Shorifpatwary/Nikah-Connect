<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationSection extends Model
{
  use HasFactory;

  protected $fillable = [
    'education_medium',
    'highest_qualification',
    'current_study',
    'previous_exams',
    'other_qualifications',
    'bio_id',
  ];
  public const FILLED_MARKS_KEY = 'education_filled_marks';
  /**
   * Get the bio associated with the education section.
   */
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}