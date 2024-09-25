<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilledMarks extends Model
{
  use HasFactory;
  protected $fillable = [
    'general_filled_marks',
    'location_filled_marks',
    'education_filled_marks',
    'personal_info_filled_marks',
    'family_filled_marks',
    'profession_filled_marks',
    'religious_activity_filled_marks',
    'marital_info_filled_marks',
    'expected_partner_filled_marks',
    'hidden_info_filled_marks',
    'bio_id',
  ];

  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}