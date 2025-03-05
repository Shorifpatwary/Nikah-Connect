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
    Schema::create('coins', function (Blueprint $table) {
      $table->id();
      $table->integer('total_coin')->nullable()->default(0);
      $table->integer('total_purchase')->nullable()->default(0);
      $table->integer('total_used')->nullable()->default(0);

      $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('coins');
  }
};
