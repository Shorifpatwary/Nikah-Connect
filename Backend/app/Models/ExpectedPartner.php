<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpectedPartner extends Model
{
  use HasFactory;

  protected $fillable = [
    'age',
    'complexion',
    'height',
    'marital_status',
    'educational_qualification',
    'profession',
    'economic_status',
    'bio_profile_types',
    'family',
    'about_partner',

    'bio_id',
  ];

  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}