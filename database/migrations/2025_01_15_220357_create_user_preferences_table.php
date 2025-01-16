<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPreferencesTable extends Migration
{
    public function up()
    {
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Foreign key referencing users table
            $table->json('preferred_sources')->nullable();  // JSON field to store preferred sources
            $table->json('preferred_categories')->nullable();  // JSON field to store preferred categories
            $table->json('preferred_authors')->nullable();  // JSON field to store preferred authors
            $table->timestamps();  // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_preferences');
    }
}
