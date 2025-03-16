<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'bio_id',
  ];

  // Define inverse one-to-one relationship with User
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  // Define inverse one-to-one relationship with bio
  public function bio()
  {
    return $this->belongsTo(Bio::class);
  }
}