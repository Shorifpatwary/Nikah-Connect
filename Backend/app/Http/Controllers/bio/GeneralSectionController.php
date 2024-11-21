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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        return response()->json(['error' => 'You have already created a General Section.'], 403);
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
        'user_id' => auth()->id(), // Get the authenticated user's ID
      ]);

      // Create the GeneralSection record
      $generalSection = GeneralSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of general information filled
      $generalFields = [
        'gender',
        'marital_status',
        'birth_date',
        'height',
        'weight',
        'complexion',
        'blood_group',
        'language_skills',
        'location_id'
      ];

      $filledFields = 0;

      foreach ($generalFields as $field) {
        if (!empty($generalSection->$field)) {
          $filledFields++;
        }
      }

      $generalFilledMarks = ($filledFields / count($generalFields)) * 100; // Calculate percentage

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
      return response()->json(['error' => 'Unable to create records.' . $e->getMessage()], 500);
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

      // Calculate the percentage of general information filled
      $generalFields = [
        'gender',
        'marital_status',
        'birth_date',
        'height',
        'weight',
        'complexion',
        'blood_group',
        'language_skills',
        'location_id'
      ];

      $filledFields = 0;

      foreach ($generalFields as $field) {
        if (!empty($general->$field)) {
          $filledFields++;
        }
      }

      $generalFilledMarks = ($filledFields / count($generalFields)) * 100; // Calculate percentage

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
      return response()->json(['error' => 'Failed to update General Section.', 'message' => $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(GeneralSection $general)
  {
    //
  }

  public function getUserRecord()
  {
    // Get the logged-in user's bio
    $bio = Bio::where('user_id', auth()->id())->first();
    // Check if the authenticated user's bio has a GeneralSection entry
    $generalSection = GeneralSection::with('location')->where('bio_id', $bio->id)->first();
    // If no GeneralSection exists, you can return a custom error response or handle it as needed
    if (!$generalSection) {
      return response()->json(['message' => 'No general section found.'], 404);
    }

    // Return the GeneralSectionResource with the fetched data
    return new GeneralSectionResource($generalSection);
  }
}