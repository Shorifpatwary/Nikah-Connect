<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // public function roles()
    // {
    //     return $this->belongsToMany(Role::class);
    // }

    public function getRoleNames()
    {
        // Assuming you are using Spatie's Laravel Permission package
        return $this->roles->pluck('name')->toArray();
    }
    public function  bio()
    {
        return $this->hasOne(Bio::class);
    }

    // Define one-to-one relationship with UserInfo
    // public function userInfo()
    // {
    //     return $this->hasOne(UserInfo::class);
    // }


    /**
     * Perform pre-authorization checks on the model.
     */
    // public function before(User $user, string $ability): bool|null
    // {
    //     if ($user->hasRole('super admin')) {
    //         return true;
    //     }

    //     return null; // see the note above in Gate::before about why null must be returned here.
    // }
}