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
    Schema::create('personal_details', function (Blueprint $table) {
      $table->id();
      // nullable for short bio
      $table->text('about_yourself')->nullable();
      // nullable for short bio
      $table->string('outdoor_clothing')->nullable();
      // nullable for short bio
      $table->text('physical_mental_illness')->nullable();
      $table->text('favorite_books')->nullable();
      $table->text('favorite_online_personalities')->nullable();
      $table->text('device_usage_time')->nullable();
      $table->text('affiliations')->nullable();

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('personal_details');
  }
};