<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReligiousActivity extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'prayer_habits',
    'haram_relationships',
    'quran_recitation',
    'mahram_adherence',
    'has_beard',
    'entertainment_habits',
    'mazhab',
    'religious_beliefs',
    'religious_knowledge',
    'family_religious_environment',
    'bio_id',
  ];

  public const FILLED_MARKS_KEY = 'religious_activity_filled_marks';

  /**
   * Get the bio associated with the religious detail.
   */
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}