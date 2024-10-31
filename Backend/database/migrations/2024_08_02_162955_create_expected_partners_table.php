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
    Schema::create('expected_partners', function (Blueprint $table) {
      $table->id();
      $table->string('age',);
      $table->string('complexion');
      $table->text('height',);
      $table->string('marital_status');
      $table->text('educational_qualification');
      $table->text('profession');
      $table->string('economic_status',);
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