<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class Child extends Model implements Authenticatable
{
    use HasFactory, AuthenticatableTrait;

    protected $fillable = ['name', 'password', 'parent_id', 'family_id'];

    protected $hidden = ['password'];

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function family()
    {
        return $this->belongsTo(Family::class, 'family_id');
    }
}
