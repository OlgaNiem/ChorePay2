<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->nullable()->change();
            
            if (!Schema::hasColumn('users', 'parent_id')) {
                $table->foreignId('parent_id')->nullable()->constrained('users')->cascadeOnDelete();
            }

            if (!Schema::hasColumn('users', 'family_id')) {
                $table->foreignId('family_id')->nullable()->constrained('families')->cascadeOnDelete();
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'parent_id')) {
                $table->dropForeign(['parent_id']);
                $table->dropColumn('parent_id');
            }

            if (Schema::hasColumn('users', 'family_id')) {
                $table->dropForeign(['family_id']);
                $table->dropColumn('family_id');
            }

            $table->string('email')->nullable(false)->change();
        });
    }

};
