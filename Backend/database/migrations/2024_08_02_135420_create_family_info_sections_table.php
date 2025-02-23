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
		Schema::create('family_info_sections', function (Blueprint $table) {
			$table->id();
			$table->text('family_members_info');
			$table->text('uncles_info')->nullable();
			$table->text('descent')->nullable();
			$table->enum('economic_status', StatusEnum::ECONOMIC_STATUS);
			$table->text('economic_status_details')->nullable();

			$table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('family_info_sections');
	}
};