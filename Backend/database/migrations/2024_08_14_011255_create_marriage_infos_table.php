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
		Schema::create('marriage_infos', function (Blueprint $table) {
			$table->id();
			$table->text('prev_marriage')->nullable();
			$table->text('work_after');
			$table->text('study_after');
			$table->text('ceremony_plans')->nullable();
			$table->text('partner_view_rules')->nullable();
			$table->text('marriage_weakness')->nullable();
			$table->text('family_pref')->nullable();
			$table->text('compromise_factors')->nullable();
			$table->text('dowry_amount');
			$table->text('dowry_opinion')->nullable();
			$table->text('cash_gift_opinion')->nullable();

			$table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('marriage_infos');
	}
};