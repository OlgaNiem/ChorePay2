<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Task extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'id';

    protected $fillable = [
        'uuid',
        'title',
        'description',
        'priority',
        'reward',
        'status',
        'assigned_to',
        'created_by',
    ];

    protected static function booted(): void
    {
        static::creating(function ($task) {
            if (empty($task->id)) {
                $task->id = (string) Str::uuid();
            }

            if (empty($task->uuid)) {
                $task->uuid = (string) Str::uuid();
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