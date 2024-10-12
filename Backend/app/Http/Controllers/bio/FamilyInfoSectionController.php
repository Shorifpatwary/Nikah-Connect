<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioFamilyInfoRequest;
use App\Http\Resources\Bio\FamilyInfoResource;
use App\Models\Bio;
use App\Models\FamilyInfoSection;
use App\Models\FilledMarks;
use Illuminate\Http\Request;
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
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has a BioFamilyInfo entry via the Bio model
      $existingFamilyInfo = FamilyInfoSection::where('bio_id', $bio->id)->first();

      if ($existingFamilyInfo) {
        // If a BioFamilyInfo already exists, return an error response
        return response()->json(['error' => 'You have already created a Family Information entry.'], 403);
      }

      // Create the BioFamilyInfo record
      $familyInfo = FamilyInfoSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of family information filled
      $familyFields = [
        'family_members_info',
        'uncles_info',
        'descent',
        'economic_status',
        'economic_status_details',
      ];

      $filledFields = 0;

      foreach ($familyFields as $field) {
        if (!empty($familyInfo->$field)) {
          $filledFields++;
        }
      }

      $familyFilledMarks = ($filledFields / count($familyFields)) * 100; // Calculate percentage

      // Create or update the FilledMarks record with calculated family filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'family_filled_marks' => $familyFilledMarks,
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
      return response()->json(['error' => 'Unable to create records.' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(FamilyInfoSection $familyInfoSection)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, FamilyInfoSection $familyInfoSection)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(FamilyInfoSection $familyInfoSection)
  {
    //
  }
}
