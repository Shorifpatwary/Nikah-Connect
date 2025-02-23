<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessionSection extends Model
{
  use HasFactory;

  protected $fillable = [
    'profession',
    'profession_description',
    'monthly_income',
    'bio_id',
  ];
  public const FILLED_MARKS_KEY = 'profession_filled_marks';

  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}