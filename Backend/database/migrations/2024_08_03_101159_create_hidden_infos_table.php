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
    Schema::create('hidden_infos', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->text('family_members_name');
      $table->string('current_parent');
      $table->string('parent_mobile');
      $table->string('permanent_address_map_location')->nullable();
      $table->string('present_address_map_location')->nullable();
      $table->string('email');
      $table->text('social_links')->nullable();

      $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('hidden_infos');
  }
};