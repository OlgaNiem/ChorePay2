<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('task_id');
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->timestamps();

            $table->foreign('user_id')->references('uuid')->on('users')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade'); // 👈 вот здесь по ID!
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
