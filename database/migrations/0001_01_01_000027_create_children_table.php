<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('children', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('password');
            $table->uuid('parent_id');
            $table->uuid('family_id');
            $table->timestamps();

            $table->foreign('parent_id')->references('uuid')->on('users')->onDelete('cascade');
            $table->foreign('family_id')->references('uuid')->on('families')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('children');
    }
};
