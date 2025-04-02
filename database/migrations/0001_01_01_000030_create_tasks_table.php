<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('priority', ['low', 'medium', 'high'])->default('high');
            $table->decimal('reward', 10, 2);
            $table->enum('status', ['pending', 'completed'])->default('pending');

            $table->boolean('is_approved')->default(false);
            $table->decimal('paid_amount', 10, 2)->nullable();

            $table->date('due_date')->nullable();

            $table->uuid('assigned_to')->nullable();
            $table->uuid('created_by');

            $table->foreign('assigned_to')->references('uuid')->on('users')->onDelete('set null');
            $table->foreign('created_by')->references('uuid')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['assigned_to']);
            $table->dropForeign(['created_by']);
        });

        Schema::dropIfExists('tasks');
    }
};
