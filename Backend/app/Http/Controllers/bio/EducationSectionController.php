<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioEducationRequest;
use App\Http\Resources\Bio\EducationSectionResource;
use App\Models\Bio;
use App\Models\EducationSection;
use App\Models\FilledMarks;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationSectionController extends Controller
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
  public function store(StoreBioEducationRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }
      // Check if the authenticated user already has an EducationSection via the Bio model
      if (EducationSection::where('bio_id', $bio->id)->exists()) {
        // If a Bio already exists, return an error response
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি শিক্ষা বিভাগের রেকর্ড তৈরি করেছেন।'], 403);
      }

      // Create the EducationSection record
      $educationSection = EducationSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for EducationSection
      $educationFilledMarks = $this->calculateFilledMarks($educationSection);
      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'education_filled_marks' => $educationFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for EducationSection
      return new EducationSectionResource($educationSection);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Handle the error, e.g., log it, return an error response, etc.
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(EducationSection $educationSection)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */ public function update(StoreBioEducationRequest $request, EducationSection $education)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $education->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }

      // Update the EducationSection record
      $education->update($request->validated());

      // Calculate the percentage of filled fields for EducationSection
      $educationFilledMarks = $this->calculateFilledMarks($education);
      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'education_filled_marks' => $educationFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for EducationSection
      return new EducationSectionResource($education);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(EducationSection $education)
  {
    //
  }


  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(EducationSection $educationSection)
  {
    $educationFields = [
      'highest_qualification',
      'current_study',
      'previous_exams',
      'other_qualifications',
    ];

    $filledFields = count(array_filter($educationFields, fn($field) => !empty($educationSection->$field) || $educationSection->$field !== null));
    return ($filledFields / count($educationFields)) * 100;
  }
}