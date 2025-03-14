<?php

namespace App\Services;

use App\Models\Family;
use Illuminate\Support\Facades\Auth;

class FamilyService
{
    public function createFamily(array $data): Family
    {
        $data['created_by'] = Auth::id();

        try {
            \Log::info('Family creation data: ', $data);
            $family = Family::create($data);
            $user = Auth::user();
            $user->family_id = $family->id;
            $user->save();
            return $family;
        } catch (\Exception $e) {
            \Log::error('Error creating family: ' . $e->getMessage());
            throw new \Exception('Failed to create family. Please try again.');
        }
    }
}
