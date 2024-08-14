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
    Schema::create('religious_activities', function (Blueprint $table) {
      $table->id();
      $table->text('prayer_habits')->nullable();
      $table->text('haram_relationships')->nullable();
      $table->text('quran_recitation')->nullable();
      $table->text('mahram_adherence')->nullable();
      $table->text('has_beard')->nullable();
      $table->text('entertainment_habits')->nullable();
      $table->enum('mazhab', StatusEnum::ALL_MAZHAB);
      $table->text('religious_beliefs')->nullable();
      $table->text('religious_knowledge')->nullable();
      $table->text('family_religious_environment')->nullable();

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('religious_activities');
  }
};