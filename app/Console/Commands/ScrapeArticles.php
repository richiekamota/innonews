<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Article;

class ScrapeArticles extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'articles:scrape';

    /**
     * The console command description.
     */
    protected $description = 'Scrape articles from APIs and store them in the database';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info('Starting article scraping...');

        try {
            // Call individual methods for each API
            $this->scrapeNewsApi();
            $this->scrapeTheGuardian();
            $this->scrapeNewYorkTimes();

            $this->info('Articles scraped and stored successfully!');
        } catch (\Exception $e) {
            $this->error('Error occurred while scraping articles: ' . $e->getMessage());
        }
    }

    /**
     * Scrape articles from NewsAPI.
     */
    private function scrapeNewsApi(): void
    {
        $this->info('Scraping articles from NewsAPI...');
        $apiKey = env('NEWS_API_KEY');
        $response = Http::get("https://newsapi.org/v2/everything", [
            'q' => "keyword",
            'apiKey' => $apiKey,
            'language' => 'en',
            'pageSize' => 10,
        ]);
        

        if ($response->ok()) {
            foreach ($response->json('articles') as $article) {
                
                Article::updateOrCreate(
                    ['title' => $article['title']],
                    [
                        'description' => $article['description'] ?? 'No description',
                        'content' => $article['content'] ?? 'No content',
                        'source' => $article['source']['name'] ?? 'Unknown',
                        'author' => $article['author'] ?? 'Unknown',
                        'published_at' => $article['publishedAt'] ?? now(),
                        'url' => $article['url'],
                        'category' => 'General',
                    ]
                );
            }
            $this->info('NewsAPI articles stored successfully.');
        } else {
            $this->error('Failed to fetch articles from NewsAPI: ' . $response->body());
        }
    }

    /**
    * Scrape articles from The Guardian API.
    */
    private function scrapeTheGuardian(): void
    {
        $this->info('Scraping articles from The Guardian...');
        $apiKey = env('GUARDIAN_API_KEY');
        $response = Http::get("https://content.guardianapis.com/search", [
           'api-key' => $apiKey,
           'show-fields' => 'all',
           'page-size' => 10, // Limit to 10 articles
        ]);

        if ($response->ok()) {
          foreach ($response->json('response.results') as $article) {
                Article::updateOrCreate(
                   ['title' => $article['fields']['headline'] ?? $article['webTitle']], // Fallback to webTitle if headline is missing
                   [
                     'description' => $article['fields']['trailText'] ?? 'No description', // Added fallback for trailText
                     'content' => $article['fields']['bodyText'] ?? 'No content', // Fallback for bodyText
                     'source' => 'The Guardian',
                     'author' => $article['fields']['byline'] ?? 'Unknown', // Fallback to 'Unknown' if byline is missing
                     'published_at' => $article['webPublicationDate'] ?? now(), // Default to current time if missing
                     'url' => $article['webUrl'],
                     'category' => $article['sectionName'] ?? 'General', // Default to 'General' if sectionName is missing
                     'urlToImage' => $article['fields']['thumbnail'] ?? null, // Added field for image URL, if available
                     'short_url' => $article['fields']['shortUrl'] ?? null, // Added field for short URL
                     'word_count' => $article['fields']['wordcount'] ?? 0, // Word count
                    ]
               );
            }
            $this->info('The Guardian articles stored successfully.');
        } else {
          $this->error('Failed to fetch articles from The Guardian: ' . $response->body());
       }
    }

    /**
    * Scrape articles from New York Times API.
    */
    private function scrapeNewYorkTimes(): void
    {
         $this->info('Scraping articles from New York Times...');
         $apiKey = env('NYT_API_KEY'); // API key from environment
         $response = Http::get("https://api.nytimes.com/svc/topstories/v2/home.json", [
            'api-key' => $apiKey,
         ]);

        if ($response->ok()) {
           $articles = $response->json('results'); // Dynamically fetch articles from the API

            foreach ($articles as $article) {
            
              Article::updateOrCreate(
                ['title' => $article['title']],
                [
                    'description' => $article['abstract'] ?? 'No description',
                    'content' => $article['abstract'] ?? 'No content',
                    'source' => 'New York Times',
                    'author' => $article['byline'] ?? 'Unknown',
                    'published_at' => $article['published_date'] ?? now(),
                    'url' => $article['url'],
                    'category' => $article['section'] ?? 'General',
                ]
            );            
        }

         $this->info('New York Times articles stored successfully.');
        } else {
          $this->error('Failed to fetch articles from New York Times: ' . $response->body());
       }
    }
}    
