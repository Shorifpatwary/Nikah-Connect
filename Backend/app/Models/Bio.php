<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bio extends Model
{
    use HasFactory;


    protected $fillable = ['title', 'status'];

    /**
     * The tags that belong to the bio.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}