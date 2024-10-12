<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioLocationRequest;
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
      // Fetch the Bio model for the authenticated user
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio) {
        return response()->json(['error' => 'No associated Bio found for this user.'], 404);
      }

      // Check if the authenticated user already has a LocationSection via the Bio model
      $existingLocationSection = LocationSection::where('bio_id', $bio->id)->first();

      if ($existingLocationSection) {
        // If a LocationSection already exists, return an error response
        return response()->json(['error' => 'You have already created a Location Section.'], 403);
      }

      // Create the LocationSection record
      $locationSection = LocationSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of location information filled
      $locationFields = [
        'permanent_address',
        'present_address',
        'relocate_plan',
        'childhood_address',
      ];

      $filledFields = 0;

      foreach ($locationFields as $field) {
        if (!empty($locationSection->$field)) {
          $filledFields++;
        }
      }

      $locationFilledMarks = ($filledFields / count($locationFields)) * 100; // Calculate percentage

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
      return response()->json(['error' => 'Unable to create records.' . $e->getMessage()], 500);
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
  public function update(Request $request, LocationSection $locationSection)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(LocationSection $locationSection)
  {
    //
  }
}
