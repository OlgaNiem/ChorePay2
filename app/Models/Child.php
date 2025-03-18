<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    use HasFactory;

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
