<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    /**
     * Example of a shared method that can be used in child controllers.
     * This method can be used to check if a user has a specific role.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $role
     * @return bool
     */
    protected function hasRole(Request $request, string $role): bool
    {
        // Example: You can check user roles or any logic you want
        return $request->user()->role === $role;
    }

    /**
     * Example of middleware you can apply globally to all controllers.
     * If you want to apply middleware here instead of in each controller.
     */
    public function __construct()
    {
        // You can attach middleware globally for all controllers here
        // $this->middleware('auth');
    }
}
