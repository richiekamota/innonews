<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->string('source');
            $table->string('author')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('url')->nullable()->change();
            $table->string('category')->default('General');
            $table->timestamps();
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
