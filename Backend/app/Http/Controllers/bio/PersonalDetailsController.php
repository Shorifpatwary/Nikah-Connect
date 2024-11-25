<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioPersonalDetailsRequest;
use App\Http\Resources\Bio\PersonalDetailsSectionResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\PersonalDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonalDetailsController extends Controller
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
   */ public function store(StoreBioPersonalDetailsRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has a PersonalDetails entry via the Bio model
      $existingPersonalDetail = PersonalDetails::where('bio_id', $bio->id)->first();

      if ($existingPersonalDetail) {
        // If a PersonalDetail already exists, return an error response
        return response()->json(['error' => 'You have already created a Personal Details entry.'], 403);
      }

      // Create the PersonalDetail record
      $personalDetail = PersonalDetails::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of personal information filled
      $personalFields = [
        'about_yourself',
        'outdoor_clothing',
        'physical_mental_illness',
        'favorite_books',
        'favorite_online_personalities',
        'device_usage_time',
        'affiliations',
      ];

      $filledFields = 0;

      foreach ($personalFields as $field) {
        if (!empty($personalDetail->$field)) {
          $filledFields++;
        }
      }

      $personalFilledMarks = ($filledFields / count($personalFields)) * 100; // Calculate percentage

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'personal_info_filled_marks' => $personalFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for PersonalDetail
      return new PersonalDetailsSectionResource($personalDetail);
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
  public function show(PersonalDetails $personal_detail)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioPersonalDetailsRequest $request, PersonalDetails $personal_detail)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Ensure the PersonalDetails record belongs to the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      // Update the PersonalDetails record
      $personal_detail->update($request->validated());

      // Calculate the percentage of personal information filled
      $personalFields = [
        'about_yourself',
        'outdoor_clothing',
        'physical_mental_illness',
        'favorite_books',
        'favorite_online_personalities',
        'device_usage_time',
        'affiliations',
      ];

      $filledFields = 0;

      foreach ($personalFields as $field) {
        if (!empty($personal_detail->$field)) {
          $filledFields++;
        }
      }

      $personalFilledMarks = ($filledFields / count($personalFields)) * 100; // Calculate percentage

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'personal_info_filled_marks' => $personalFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource
      return new PersonalDetailsSectionResource($personal_detail);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Handle the error
      return response()->json(['error' => 'Unable to update records.' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(PersonalDetails $personal_detail)
  {
    //
  }
}
