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
    Schema::create('education_sections', function (Blueprint $table) {
      $table->id();
      $table->enum('education_medium', StatusEnum::EDUCATION_MEDIUM)->nullable(false);
      $table->text('highest_qualification');
      $table->text('current_study')->nullable();
      $table->text('previous_exams');
      $table->text('other_qualifications')->nullable();

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('education_sections');
  }
};
