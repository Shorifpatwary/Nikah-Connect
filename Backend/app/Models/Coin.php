<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
  use HasFactory;

  protected $fillable = ['total_coin', 'total_purchase', 'total_used', 'user_id'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}