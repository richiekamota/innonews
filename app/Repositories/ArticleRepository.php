<?php

namespace App\Repositories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class ArticleRepository
{
    /**
     * Apply filters to the articles query.
     *
     * @param array $filters
     * @param Builder $query
     * @return Builder
     */
    public function applyFilters(array $filters, Builder $query): Builder
{
    // Log the filters being applied
    Log::info('Filters being applied: ', $filters);

    // Apply source filter if provided
    if (!empty($filters['source'])) {
        $query->whereIn('source', (array) $filters['source']);
    }

    // Apply category filter if provided
    if (!empty($filters['category'])) {
        $query->whereIn('category', (array) $filters['category']);
    }

    // Apply date range filter
    if (!empty($filters['startDate']) && !empty($filters['endDate'])) {
        $query->whereBetween('published_at', [$filters['startDate'], $filters['endDate']]);
    }

    // Apply search filter with OR logic for title and description
    if (!empty($filters['search'])) {
        $keywords = explode(',', $filters['search']);
        
        $query->where(function ($query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhere('title', 'LIKE', '%' . trim($keyword) . '%')
                      ->orWhere('description', 'LIKE', '%' . trim($keyword) . '%');
            }
        });
    }

    // Log the query and bindings to check what is being executed
    Log::info('SQL Query: ' . $query->toSql());
    Log::info('Query Bindings: ', $query->getBindings());

    return $query;
}



    /**
     * Fetch filtered articles based on user preferences and additional filters.
     *
     * @param array $filters
     * @param array $preferences
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFilteredArticles(array $filters, array $preferences)
    {
        $query = Article::query();
    
        // Merge user preferences with the filters
        $sources = $preferences['sources'] ?? [];
        $categories = $preferences['categories'] ?? [];
    
        // Check if the sources and categories arrays are not empty before applying them
        if (!empty($sources)) {
            $query->whereIn('source', $sources);
        }
    
        if (!empty($categories)) {
            $query->whereIn('category', $categories);
        }
    
        // Apply the filters
        $this->applyFilters($filters, $query);
    
        return $query->get();
    }
    
}
