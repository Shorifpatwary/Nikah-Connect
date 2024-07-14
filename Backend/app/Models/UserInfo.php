<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;
    protected $fillable = [
        'device_type',
        'device_os',
        'browser_name',
        'browser_version',
        'ip_address',
        'country',
        'city',
        'user_agent',
        'device_model',
        'registration_source',
        'screen_resolution',
        'internet',
        'region',
        'postal',
        'loc',
        'timezone',
        'user_id',
    ];

    // Define inverse one-to-one relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}