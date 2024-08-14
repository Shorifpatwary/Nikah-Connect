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
    Schema::create('expected_partners', function (Blueprint $table) {
      $table->id();
      $table->integer('age');
      $table->enum('complexion', StatusEnum::COMPLEXIONS);
      $table->decimal('height');
      $table->enum('marital_status', StatusEnum::MARITAL_STATUS);
      $table->text('educational_qualification');
      $table->text('profession');
      $table->enum('economic_status', StatusEnum::ECONOMIC_STATUS);
      $table->text('family')->nullable();
      $table->text('about_partner')->nullable();

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('expected_partners');
  }
};