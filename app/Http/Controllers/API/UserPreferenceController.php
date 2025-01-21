<?php

namespace App\Http\Controllers\API;

use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;


class UserPreferenceController extends Controller
{
    /**
     * Show the preferences for the logged-in user.
     */
    public function show()
    {
       
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
        }
      $preferences = $user->preferences;
      
      // If the preferences are stored as arrays, you can access them like this:
      $sources = $preferences->sources ?? [];
      $categories = $preferences->categories ?? [];
      $authors = $preferences->authors ?? [];
  
      return response()->json([
          'sources' => $sources,
          'categories' => $categories,
          'authors' => $authors
      ]);
    }

    /**
     * Store or update the preferences for the logged-in user.
     */
    public function storeOrUpdate(Request $request)
    {    
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
        }
    
        $preferencesData = [
            'sources' => $request->get('sources', []),
            'categories' => $request->get('categories', []),
            'authors' => $request->get('authors', []),
        ];
    
        $preferences = UserPreference::updateOrCreate(
            ['user_id' => $user->id],
            $preferencesData
        );
    
        return response()->json([
            'success' => true,
            'message' => 'Preferences saved successfully!',
            'data' => $preferences,
        ]);
    }
    
    
}
