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
      // all fields are nullable for short bio
      $table->string('age',)->nullable();
      $table->string('complexion')->nullable();
      $table->text('height',)->nullable();
      $table->string('marital_status')->nullable();
      $table->text('educational_qualification')->nullable();
      $table->text('profession')->nullable();
      $table->string('economic_status')->nullable();
      $table->text('family')->nullable();
      $table->text('about_partner')->nullable();
      $table->string('bio_profile_types')->nullable();


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