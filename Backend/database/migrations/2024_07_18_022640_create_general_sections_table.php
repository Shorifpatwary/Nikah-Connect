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
        Schema::create('general_sections', function (Blueprint $table) {
            $table->id();
            $table->enum('gender', StatusEnum::GENDERS)->nullable(false);
            $table->enum('marital_status', StatusEnum::MARITAL_STATUS)->nullable(false);
            $table->timestamp('birth_date');
            $table->double('height', 8, 2);
            $table->double('weight', 8, 2);
            $table->enum('complexion', StatusEnum::COMPLEXIONS)->nullable(false);
            $table->enum('blood_group', StatusEnum::BLOOD_GROUPS)->nullable(false);
            $table->string('language_skills')->nullable();

            // relation
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->foreignId('bio_id')->constrained('bios')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_sections');
    }
};