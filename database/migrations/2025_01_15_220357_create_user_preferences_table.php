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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->json('sources')->nullable();
            $table->json('categories')->nullable();
            $table->json('authors')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_preferences');
    }
}
