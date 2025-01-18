<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\JsonResponse;


class RegisterController extends BaseController
{
    /**
     * Register a new user.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $this->validateRegistration($request);

        // Create a new user with the validated data
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Generate the API token for the new user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return success response
        return $this->sendResponse([
            'token' => $token,
            'name' => $user->name
        ], 'User registered successfully.');
    }

    /**
     * Login user and generate token.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        // Check if the credentials match
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return $this->sendResponse([
                'token' => $token,
                'name' => $user->name
            ], 'User logged in successfully.');
        }

        // Return error if authentication fails
        return $this->sendError('Unauthorized.', ['error' => 'Unauthorized']);
    }

    /**
     * Validate registration input.
     *
     * @param Request $request
     * @return array
     * @throws ValidationException
     */
    private function validateRegistration(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
    }
}
