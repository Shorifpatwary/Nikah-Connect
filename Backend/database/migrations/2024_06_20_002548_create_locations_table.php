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
    Schema::create('locations', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->enum('type', StatusEnum::LOCATION_TYPE);

      $table->foreignId('parent_id')->nullable()->constrained('locations')->cascadeOnDelete();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('locations');
  }
};