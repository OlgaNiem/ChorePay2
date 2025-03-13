<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'created_by'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'family_id');
    }

    public static function createFamily(array $data)
    {
        try {
            return self::create($data);
        } catch (\Exception $e) {
            \Log::error('Failed to create family: ' . $e->getMessage());
            throw new \Exception('Failed to create family, please try again.');
        }
    }
}
