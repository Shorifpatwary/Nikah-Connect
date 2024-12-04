<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioLocationRequest;
use App\Http\Requests\Admin\Bio\UpdateBioLocationRequest;
use App\Http\Resources\Bio\LocationSectionResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\LocationSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocationSectionController extends Controller
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
   */ public function store(StoreBioLocationRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }

      // Check if the authenticated user already has a LocationSection via the Bio model
      if (LocationSection::where('bio_id', $bio->id)->exists()) {
        // If a LocationSection already exists, return an error response
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি অবস্থান বিভাগের রেকর্ড তৈরি করেছেন।'], 403);
      }

      // Create the LocationSection record
      $locationSection = LocationSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for LocationSection
      $locationFilledMarks = $this->calculateFilledMarks($locationSection);

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'location_filled_marks' => $locationFilledMarks,
          // Add other filled marks columns if needed
        ]
      );
      // Commit the transaction
      DB::commit();

      // Return the created resource for LocationSection
      return new LocationSectionResource($locationSection);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(LocationSection $locationSection)
  {
    //
  }
  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateBioLocationRequest $request, LocationSection $location)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio || $location->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }

      // Update the LocationSection record
      $location->update($request->validated());

      // Calculate the percentage of filled fields for LocationSection
      $locationFilledMarks = $this->calculateFilledMarks($location);

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'location_filled_marks' => $locationFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource
      return new LocationSectionResource($location);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(LocationSection $location)
  {
    //
  }


  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(LocationSection $locationSection)
  {
    $locationFields = [
      'permanent_address',
      'present_address',
      'relocate_plan',
      'childhood_address',
    ];

    $filledFields = count(array_filter($locationFields, fn($field) => !empty($locationSection->$field) || $locationSection->$field !== null));
    return ($filledFields / count($locationFields)) * 100;
  }
}