<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Location extends Model
{
    use HasFactory;
    public $timestamps = false; // Disable timestamps
    protected $fillable = ['name', 'location_type', 'parent_id'];

    public function children()
    {
        return $this->hasMany(Location::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }

    public function generalSections()
    {
        return $this->hasMany(GeneralSection::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saved(function () {
            Cache::forget('nested_locations');
        });

        static::deleted(function () {
            Cache::forget('nested_locations');
        });
    }
}
