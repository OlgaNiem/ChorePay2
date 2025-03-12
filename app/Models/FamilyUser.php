<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;  // Импортируем стандартное исключение

class FamilyUser extends Model
{
    use HasFactory;

    protected $fillable = ['family_id', 'user_id', 'role'];

    /**
     * Связь с семьей.
     */
    public function family()
    {
        return $this->belongsTo(Family::class);
    }

    /**
     * Связь с пользователем.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Дополнительная валидация данных перед сохранением модели.
     *
     * @param  array  $data
     * @return \App\Models\FamilyUser
     * @throws \Exception
     */
    public static function createFamilyUser(array $data)
    {
        // Валидация данных перед сохранением
        $validatedData = validator($data, [
            'family_id' => 'required|exists:families,id',
            'user_id' => 'required|exists:users,id',
            'role' => 'required|string|max:255',
        ])->validate();

        // Проверяем, не добавлен ли уже этот пользователь в эту семью
        if (self::where('family_id', $validatedData['family_id'])
                ->where('user_id', $validatedData['user_id'])
                ->exists()) {
            // Если уже существует такая связь, выбрасываем исключение
            throw new Exception('This user is already in this family.');
        }

        // Создаем запись в таблице family_users
        return self::create($validatedData);
    }
}
