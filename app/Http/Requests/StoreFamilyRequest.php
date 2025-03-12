<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFamilyRequest extends FormRequest
{
    /**
     * Определите, авторизован ли пользователь на выполнение данного запроса.
     *
     * @return bool
     */
    public function authorize()
    {
        // Можно добавить логику авторизации, если нужно.
        return true;
    }

    /**
     * Получите правила валидации, которые будут применяться к запросу.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'created_by' => 'required|exists:users,id',
        ];
    }

    /**
     * Получите сообщение об ошибке, которое будет возвращено в случае ошибок.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Name of the family is required.',
            'created_by.exists' => 'The user who created the family must exist.',
        ];
    }
}
