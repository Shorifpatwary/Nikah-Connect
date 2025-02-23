<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarriageInfo extends Model
{
  use HasFactory;

  protected $fillable = [
    'prev_marriage',
    'work_after',
    'study_after',
    'ceremony_plans',
    'partner_view_rules',
    'marriage_weakness',
    'family_pref',
    'dowry_amount',
    'dowry_opinion',
    'compromise_factors',
    'cash_gift_opinion',
    'bio_id',
  ];
  public const FILLED_MARKS_KEY = 'marital_info_filled_marks';

  /**
   * Get the bio that owns the marriage information.
   */
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}