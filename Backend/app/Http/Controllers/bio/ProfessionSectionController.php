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
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has a ProfessionSection entry via the Bio model
      $existingProfessionSection = ProfessionSection::where('bio_id', $bio->id)->first();

      if ($existingProfessionSection) {
        // If a ProfessionSection already exists, return an error response
        return response()->json(['error' => 'You have already created a Profession Section entry.'], 403);
      }

      // Create the ProfessionSection record
      $professionSection = ProfessionSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of profession information filled
      $professionFields = [
        'profession',
        'profession_description',
        'monthly_income',
      ];

      $filledFields = 0;

      foreach ($professionFields as $field) {
        if (!empty($professionSection->$field)) {
          $filledFields++;
        }
      }

      $professionFilledMarks = ($filledFields / count($professionFields)) * 100; // Calculate percentage

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
      return response()->json(['error' => 'Unable to create records.' . $e->getMessage()], 500);
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
      // Ensure the ProfessionSection belongs to the authenticated user
      $bio = Bio::where('user_id', auth()->id())->first();

      // Update the ProfessionSection record with the validated data
      $profession->update($request->validated());

      // Calculate percentage of profession information filled
      $professionFields = [
        'profession',
        'profession_description',
        'monthly_income',
      ];

      $filledFields = 0;

      foreach ($professionFields as $field) {
        if (!empty($profession->$field)) {
          $filledFields++;
        }
      }

      $professionFilledMarks = ($filledFields / count($professionFields)) * 100; // Calculate percentage

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
      return response()->json(['error' => 'Unable to update records.' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProfessionSection $profession)
  {
    //
  }
}
