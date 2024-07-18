<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    // Define the attributes that are mass assignable
    protected $fillable = [
        'name',
        'search_text',
        'group_name',
        'status',
    ];

    public function bios()
    {
        return $this->belongsToMany(Bio::class);
    }

    // Define the attributes that should be cast to native types
    protected $casts = [
        'status' => 'string',
    ];

    // Optionally, define the default attribute values
    protected $attributes = [
        'status' => 'pending_approve',
    ];
}