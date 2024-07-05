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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            // ! do not use enum(). let them to be independent. 
            $table->string('device_type')->nullable();
            $table->string('device_os')->nullable();
            $table->string('browser_name')->nullable();
            $table->string('browser_version')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->text('user_agent')->nullable();
            $table->string('registration_source')->nullable();
            $table->string('device_model')->nullable();
            $table->string('screen_resolution')->nullable();
            $table->string('internet')->nullable();
            $table->string('region')->nullable();
            $table->string('postal')->nullable();
            $table->string('loc')->nullable();
            $table->string('timezone')->nullable();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
