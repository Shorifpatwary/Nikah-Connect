<?php

use App\Enums\StatusEnum;
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
    Schema::create('profession_sections', function (Blueprint $table) {
      $table->id();
      $table->enum('profession', StatusEnum::PROFESSION_STATUS);
      $table->text('profession_description');
      // nullable for short bio
      $table->text('monthly_income')->nullable();

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('profession_sections');
  }
};