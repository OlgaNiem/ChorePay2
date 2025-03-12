<?php

namespace App\Http\Controllers;

use App\Models\Family;
use App\Http\Requests\StoreFamilyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FamilyController extends Controller
{
    /**
     * Создает новую семью.
     *
     * @param StoreFamilyRequest $request
     * @return \Illuminate\Http\Response
     */
    public function create(StoreFamilyRequest $request)
    {
        try {
            // Валидация будет выполнена автоматически в StoreFamilyRequest
            $validatedData = $request->validated();

            // Создаем семью
            $family = Family::createFamily($validatedData);

            return response()->json($family, 201);

        } catch (\Exception $e) {
            Log::error('Error creating family: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to create family. Please try again later.'], 500);
        }
    }
}
