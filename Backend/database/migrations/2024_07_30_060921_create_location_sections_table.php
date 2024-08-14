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
        Schema::create('location_sections', function (Blueprint $table) {
            $table->id();
            $table->text('permanent_address');
            $table->text('present_address')->nullable();
            $table->text('relocate_plan')->nullable();
            $table->text('childhood_address')->nullable();

            $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_sections');
    }
};