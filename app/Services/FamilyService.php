<?php

namespace App\Services;

use App\Models\Family;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use App\Models\User; 

class FamilyService
{
    public function createFamily(array $data): Family
    {
        $data['created_by'] = Auth::user()->uuid;

        try {
            Log::info('Family creation data: ', $data);

            $family = Family::create($data);

            /** @var User $user */
            $user = Auth::user();
            $user->family_id = $family->uuid;
            $user->save();

            return $family;
        } catch (\Exception $e) {
            Log::error('Error creating family: ' . $e->getMessage());
            throw new \Exception('Failed to create family. Please try again.');
        }
    }
}
