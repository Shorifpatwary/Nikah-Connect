<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioReligiousActivitiesRequest;
use App\Http\Resources\Bio\ReligiousActivityResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\ReligiousActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReligiousActivityController extends Controller
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
  public function store(StoreBioReligiousActivitiesRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has a ReligiousActivity entry via the Bio model
      $existingReligiousActivity = ReligiousActivity::where('bio_id', $bio->id)->first();

      if ($existingReligiousActivity) {
        // If a ReligiousActivity already exists, return an error response
        return response()->json(['error' => 'You have already created a Religious Activity entry.'], 403);
      }

      // Create the ReligiousActivity record
      $religiousActivity = ReligiousActivity::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of religious information filled
      $religiousFields = [
        'prayer_habits',
        'haram_relationships',
        'quran_recitation',
        'mahram_adherence',
        'has_beard',
        'entertainment_habits',
        'mazhab',
        'religious_beliefs',
        'religious_knowledge',
        'family_religious_environment',
      ];

      $filledFields = 0;

      foreach ($religiousFields as $field) {
        if (!empty($religiousActivity->$field)) {
          $filledFields++;
        }
      }

      $religiousFilledMarks = ($filledFields / count($religiousFields)) * 100; // Calculate percentage

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'religious_activity_filled_marks' => $religiousFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for ReligiousActivity
      return new ReligiousActivityResource($religiousActivity);
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
  public function show(ReligiousActivity $religious_activity)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioReligiousActivitiesRequest $request, ReligiousActivity $religious_activity)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Ensure the ReligiousActivity belongs to the authenticated user
      $bio = Bio::where('user_id', auth()->id())->first();

      // Update the ReligiousActivity record with the validated data
      $religious_activity->update($request->validated());

      // Calculate percentage of religious information filled
      $religiousFields = [
        'prayer_habits',
        'haram_relationships',
        'quran_recitation',
        'mahram_adherence',
        'has_beard',
        'entertainment_habits',
        'mazhab',
        'religious_beliefs',
        'religious_knowledge',
        'family_religious_environment',
      ];

      $filledFields = 0;

      foreach ($religiousFields as $field) {
        if (!empty($religious_activity->$field)) {
          $filledFields++;
        }
      }

      $religiousFilledMarks = ($filledFields / count($religiousFields)) * 100; // Calculate percentage

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'religious_activity_filled_marks' => $religiousFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for ReligiousActivity
      return new ReligiousActivityResource($religious_activity);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'Unable to update records.' . $e->getMessage()], 500);
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ReligiousActivity $religious_activity)
  {
    //
  }
}