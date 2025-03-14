<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreFamilyRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check(); 
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:families,name',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The family name is required.',
            'name.unique' => 'A family with this name already exists. Please choose a different name.',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'created_by' => Auth::id(), 
        ]);
    }
}
