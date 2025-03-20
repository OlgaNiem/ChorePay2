<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Task extends Model
{
    use HasFactory;

    protected $primaryKey = 'id'; 
    protected $keyType = 'int';
    public $incrementing = true; 

    protected $fillable = ['uuid', 'title', 'description', 'priority', 'reward', 'status', 'assigned_to', 'created_by'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($task) {
            if (empty($task->uuid)) {
                $task->uuid = Str::uuid();
            }
        });
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'uuid');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'uuid');
    }
}
