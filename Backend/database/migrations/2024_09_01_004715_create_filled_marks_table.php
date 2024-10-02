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
    Schema::create('filled_marks', function (Blueprint $table) {
      $table->id();
      $table->integer('general_filled_marks')->nullable()->default(0);
      $table->integer('location_filled_marks')->nullable()->default(0);
      $table->integer('education_filled_marks')->nullable()->default(0);
      $table->integer('personal_info_filled_marks')->nullable()->default(0);
      $table->integer('family_filled_marks')->nullable()->default(0);
      $table->integer('profession_filled_marks')->nullable()->default(0);
      $table->integer('religious_activity_filled_marks')->nullable()->default(0);
      $table->integer('marital_info_filled_marks')->nullable()->default(0);
      $table->integer('expected_partner_filled_marks')->nullable()->default(0);
      $table->integer('hidden_info_filled_marks')->nullable()->default(0);

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('filled_marks');
  }
};