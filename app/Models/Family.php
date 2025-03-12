<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'created_by'];

    /**
     * Связь с пользователем, который создал семью.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Связь с пользователями, которые принадлежат этой семье.
     */
    public function users()
    {
        return $this->hasMany(FamilyUser::class);
    }

    /**
     * Создание новой семьи (без валидации, валидация теперь в FormRequest).
     *
     * @param  array  $data
     * @return \App\Models\Family
     */
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
