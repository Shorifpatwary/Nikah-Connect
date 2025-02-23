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
    Schema::create('bios', function (Blueprint $table) {
      $table->id()->startingValue(1000);

      $table->string('title')->nullable()->default("TOP_MALE"); // this should be required in validation. 
      $table->enum('bio_profile', StatusEnum::BIO_PROFILE_TYPES)->nullable();
      $table->enum('status', StatusEnum::BIO_STATUS)->default('incomplete');
      $table->enum('type', StatusEnum::BIO__TYPES)->default('LONG');

      $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('bios');
  }
};
