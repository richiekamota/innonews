<?php

namespace App\Http\Controllers\API;
use App\Models\Article;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Repositories\ArticleRepository;

class ArticleController extends Controller
{
  protected $articleRepository;

  public function __construct(ArticleRepository $articleRepository)
  {
    $this->articleRepository = $articleRepository;
  }

   /**
   * Fetch articles for a user based on their preferences and filters.
   *
   * @param Request $request
   * @param User $user
   * @return JsonResponse
   */
  public function getUserArticles(Request $request, User $user): JsonResponse
  {
    // Fetch user preferences
    $preferences = $user->preferences;

    // Fetch filters from the request
    $filters = [
      'category' => $request->input('category', ''), // Empty means all categories
      'source' => $request->input('source', ''), // Empty means all sources
      'startDate' => $request->input('startDate'),
      'endDate' => $request->input('endDate'),
      'search' => $request->input('search', ''),
    ];

    // Default to API filters if preferences are not set
    $sources = $preferences->sources ?? []; // Empty array means all sources
    $categories = $preferences->categories ?? []; // Empty array means all categories

    // Fetch filtered articles using the repository
    $articles = $this->articleRepository->getFilteredArticles($filters, [
      'sources' => $sources,
      'categories' => $categories,
    ]);

    // Return filtered articles using the resource
    return response()->json([
      'data' => ArticleResource::collection($articles),
      'message' => 'User articles fetched successfully.',
    ]);
  }

  // Add a method to get sources and categories dynamically
  public function getDropdownOptions()
  {
    $sources = Article::pluck('source')->unique();
    $categories = Article::pluck('category')->unique();
    $authors = Article::pluck('author')->unique();

      return response()->json([
        'sources' => $sources,
        'categories' => $categories,
        'authors' => $authors
      ]);
  }
}  