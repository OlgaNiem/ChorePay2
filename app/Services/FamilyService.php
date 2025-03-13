<?php

namespace App\Services;

use App\Models\Family;
use Illuminate\Support\Facades\Auth;

class FamilyService
{
    /**
     * Создание новой семьи.
     *
     * @param array $data
     * @return Family
     * @throws \Exception
     */
    public function createFamily(array $data): Family
    {
        // Создание семьи с добавлением текущего пользователя как создателя
        $data['created_by'] = Auth::id();

        try {
            $family = Family::create($data);
            return $family;
        } catch (\Exception $e) {
            // Логируем ошибку, если создание не удалось
            \Log::error('Error creating family: ' . $e->getMessage());
            throw new \Exception('Failed to create family. Please try again.');
        }
    }
}
