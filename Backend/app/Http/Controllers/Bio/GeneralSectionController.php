<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioGeneralRequest;
use App\Http\Requests\Admin\Bio\UpdateBioGeneralRequest;
use App\Http\Resources\Bio\GeneralSectionResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\GeneralSection;
use App\Models\Location;
use Illuminate\Support\Facades\DB;

class GeneralSectionController extends Controller
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
  public function store(StoreBioGeneralRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Check if the authenticated user already has a GeneralSection via the Bio model
      $existingGeneralSection = GeneralSection::whereHas('bio', function ($query) {
        $query->where('user_id', auth()->id());
      })->first();

      if ($existingGeneralSection) {
        // If a Bio already exists, return an error response
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি সাধারণ বিভাগের রেকর্ড তৈরি করেছেন।'], 403);
      }
      // Fetch location data using location_id
      $location = Location::find($request->input('location_id'));
      // Create a new Bio record
      $bio = Bio::create([
        'title' => implode(' | ', [
          'বায়ো ডাটার ধরনঃ ' . $request->input('gender'),
          $request->input('marital_status'),
          'জন্মঃ ' . $request->input('birth_date'),
          'ঠিকানাঃ ' .  $location->name . ' ' . $location->type, // Concatenate location name and type
        ]),
        'status' => 'incomplete', // Set status to 'pending'
        'type' => 'LONG', // Set type to 'pending'
        'user_id' => auth()->id(), // Get the authenticated user's ID
      ]);

      // Create the GeneralSection record
      $generalSection = GeneralSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for GeneralSection
      $generalFilledMarks = $this->calculateFilledMarks($generalSection);

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'general_filled_marks' => $generalFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for GeneralSection
      return new GeneralSectionResource($generalSection);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Handle the error, e.g., log it, return an error response, etc.
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। .' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(GeneralSection $general)
  {
    return new GeneralSectionResource($general);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateBioGeneralRequest $request, GeneralSection $general)
  {
    // Begin a database transaction
    DB::beginTransaction();
    try {

      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $general->bio_id !== $bio->id) {
        return response()->json(['error' => 'আপনার এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }

      // Fetch the location data using location_id
      $location = Location::find($request->input('location_id'));

      // Update the Bio title with the new data
      $general->bio->update([
        'title' => implode(' | ', [
          'বায়ো ডাটার ধরনঃ ' . $request->input('gender'),
          $request->input('marital_status'),
          'জন্মঃ ' . $request->input('birth_date'),
          'ঠিকানাঃ ' .  $location->name . ' ' . $location->type,
        ]),
      ]);

      // Update the GeneralSection record with the validated data
      $general->update($request->validated());

      // Calculate the percentage of filled fields for GeneralSection
      $generalFilledMarks = $this->calculateFilledMarks($general);

      // Create or update the FilledMarks record with the new filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $general->bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'general_filled_marks' => $generalFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for GeneralSection
      return new GeneralSectionResource($general);
    } catch (\Exception $e) {
      // Rollback the transaction if an error occurs
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।', 'message' => $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(GeneralSection $general)
  {
    //
  }

  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(GeneralSection $generalSection)
  {
    $generalFields = [
      'gender',
      'marital_status',
      'birth_date',
      'height',
      'weight',
      'complexion',
      'blood_group',
      'language_skills',
      'location_id',
    ];

    $filledFields = count(array_filter($generalFields, fn($field) => !empty($generalSection->$field) || $generalSection->$field !== null));
    return ($filledFields / count($generalFields)) * 100;
  }
}
