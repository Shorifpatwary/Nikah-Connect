<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioFamilyInfoRequest;
use App\Http\Resources\Bio\FamilyInfoResource;
use App\Models\Bio;
use App\Models\FamilyInfoSection;
use App\Models\FilledMarks;
use Illuminate\Support\Facades\DB;

class FamilyInfoSectionController extends Controller
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
  public function store(StoreBioFamilyInfoRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }
      // Check if the authenticated user already has a BioFamilyInfo entry via the Bio model
      $existingFamilyInfo = FamilyInfoSection::where('bio_id', $bio->id)->first();

      if (FamilyInfoSection::where('bio_id', $bio->id)->exists()) {
        // If a BioFamilyInfo already exists, return an error response
        return response()->json(['error' => 'You have already created a Family Information entry.'], 403);
      }

      // Create the BioFamilyInfo record
      $familyInfo = FamilyInfoSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for the FamilyInfo
      $familyInfoFilledMarks = $this->calculateFilledMarks($familyInfo);
      // Create or update the FilledMarks record with calculated family filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'family_filled_marks' => $familyInfoFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for BioFamilyInfo
      return new FamilyInfoResource($familyInfo);
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
  public function show(FamilyInfoSection $family_info)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioFamilyInfoRequest $request, FamilyInfoSection $family_info)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $family_info->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }
      // Update the FamilyInfoSection record
      $family_info->update($request->validated());

      // Calculate the percentage of filled fields for the FamilyInfo
      $familyInfoFilledMarks = $this->calculateFilledMarks($family_info);
      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'family_filled_marks' => $familyInfoFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for FamilyInfoSection
      return new FamilyInfoResource($family_info);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Handle the error, e.g., log it, return an error response, etc.
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(FamilyInfoSection $family_info)
  {
    //
  }

  /**
   * Helper function to calculate the filled marks percentage
   */
  private function calculateFilledMarks(FamilyInfoSection $familyInfo)
  {
    $familyFields = [
      'family_members_info',
      'uncles_info',
      'descent',
      'economic_status',
      'economic_status_details',
    ];

    $filledFields = count(array_filter($familyFields, fn($field) => !empty($familyInfo->$field) || $familyInfo->$field !== null));
    return ($filledFields / count($familyFields)) * 100;
  }
}
