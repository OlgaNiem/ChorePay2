<?php

namespace App\Http\Controllers;

use App\Models\Family;
use App\Http\Requests\StoreFamilyRequest;
use App\Services\FamilyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FamilyController extends Controller
{
    protected $familyService;

    public function __construct(FamilyService $familyService)
    {
        $this->familyService = $familyService;
    }

    public function create()
    {
        $user = Auth::user();

        if ($user && $user->family) {
            return redirect()->route('family-options')
                ->with('message', 'You are already part of a family.');
        }

        return Inertia::render('create-family');
    }

    public function store(StoreFamilyRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['created_by'] = Auth::id();

            $family = $this->familyService->createFamily($validatedData);

            return redirect()->route('join-family')->with('message', 'Family created successfully. You can now join your family.');

        } catch (\Exception $e) {
            Log::error('Error creating family: ' . $e->getMessage());

            return redirect()->route('create-family')
                ->with('error', 'Failed to create family. Please try again later.');
        }
    }
}
