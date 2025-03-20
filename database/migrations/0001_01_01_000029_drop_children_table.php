<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::dropIfExists('children');
    }
    
    public function down()
    {
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('password');
            $table->foreignId('parent_id')->constrained('users');
            $table->foreignId('family_id')->constrained('families');
            $table->timestamps();
        });
    }
    
};
