<?php

namespace App\Http\Controllers\API;

use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\ArticleResource;

class ArticleController extends BaseController
{
    /**
     * Store scraped articles in the database.
     *
     * @param array $articles
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeScrapedArticles(Request $request): JsonResponse
    {
        $articles = $request->input('articles'); // Assuming the scraped articles are sent as part of the request

        // Ensure the user is authenticated
        $user = Auth::user();
        if (!$user) {
            return $this->sendError('User not authenticated', [], 401);
        }

        // Fetch user preferences
        $preferences = $user->preferences;

        // Loop through each article and store if it matches preferences
        foreach ($articles as $article) {
            if (in_array($article['category'], $preferences->preferred_categories) &&
                in_array($article['source']['name'], $preferences->preferred_sources)) {

                // Create and store the article
                Article::create([
                    'title' => $article['title'],
                    'description' => $article['description'],
                    'author' => $article['author'],
                    'source' => $article['source']['name'],
                    'category' => $article['category'],
                    'published_at' => $article['publishedAt'],
                ]);
            }
        }

        // Return success message
        return $this->sendResponse([], 'Articles stored successfully!');
    }

    /**
     * Fetch articles for a user based on their preferences.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserArticles(User $user): JsonResponse
{
    // Fetch user preferences
    $preferences = $user->preferences;

    // Filter articles based on preferred sources and categories
    $filteredArticles = Article::whereIn('source', $preferences->preferred_sources)
                                ->whereIn('category', $preferences->preferred_categories)
                                ->get();

    // Return filtered articles using the resource
    return $this->sendResponse(
        ArticleResource::collection($filteredArticles),
        'User articles fetched successfully.'
    );
}
}
