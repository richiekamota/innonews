<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\UserPreferenceController;

// Add the Sanctum CSRF cookie route
Route::get('sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

// Register and Login routes
Route::controller(RegisterController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->post('/logout', [RegisterController::class, 'logout']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dropdown-options', [ArticleController::class, 'getDropdownOptions']);
    Route::get('/user-preferences', [UserPreferenceController::class, 'show']);
    Route::get('articles', [ArticleController::class, 'getUserArticles']);
    Route::get('preferences', [UserPreferenceController::class, 'show']);
    Route::post('preferences', [UserPreferenceController::class, 'storeOrUpdate']);
    Route::put('preferences', [UserPreferenceController::class, 'storeOrUpdate']);
    Route::post('logout', [RegisterController::class, 'logout']);
});
