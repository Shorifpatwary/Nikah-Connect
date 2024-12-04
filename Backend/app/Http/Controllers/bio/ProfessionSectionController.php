<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioProfessionRequest;
use App\Http\Resources\Bio\ProfessionResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\ProfessionSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfessionSectionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreBioProfessionRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }

      // Check if the authenticated user already has a ProfessionSection entry via the Bio model
      if (ProfessionSection::where('bio_id', $bio->id)->exists()) {
        // If a ProfessionSection already exists, return an error response
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি পেশা বিভাগের রেকর্ড তৈরি করেছেন।'], 403);
      }

      // Create the ProfessionSection record
      $professionSection = ProfessionSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for ProfessionSection
      $professionFilledMarks = $this->calculateFilledMarks($professionSection);

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'profession_filled_marks' => $professionFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for ProfessionSection
      return new ProfessionResource($professionSection);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Handle the error, e.g., log it, return an error response, etc.
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(ProfessionSection $profession)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioProfessionRequest $request, ProfessionSection $profession)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio || $profession->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }
      // Update the ProfessionSection record with the validated data
      $profession->update($request->validated());

      // Calculate the percentage of filled fields for ProfessionSection
      $professionFilledMarks = $this->calculateFilledMarks($profession);

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'profession_filled_marks' => $professionFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for ProfessionSection
      return new ProfessionResource($profession);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProfessionSection $profession)
  {
    //
  }


  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(ProfessionSection $professionSection)
  {
    $professionFields = [
      'profession',
      'profession_description',
      'monthly_income',
    ];

    $filledFields = count(array_filter($professionFields, fn($field) => !empty($professionSection->$field) || $professionSection->$field !== null));
    return ($filledFields / count($professionFields)) * 100;
  }
}