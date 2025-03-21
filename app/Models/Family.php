<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class Family extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'id';

    protected $fillable = ['name', 'created_by'];

    protected static function booted(): void
    {
        static::creating(function ($family) {
            if (empty($family->id)) {
                $family->id = (string) Str::uuid();
            }

            if (empty($family->uuid)) {
                $family->uuid = (string) Str::uuid();
            }
        });
    }


    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'uuid');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'family_id', 'uuid');
    }

    public function children()
    {
        return $this->hasMany(User::class, 'family_id', 'uuid')->where('role', 'child');
    }

    public static function createFamily(array $data)
    {
        try {
            return self::create($data);
        } catch (\Exception $e) {
            Log::error('Failed to create family: ' . $e->getMessage());
            throw new \Exception('Failed to create family, please try again.');
        }
    }
}
