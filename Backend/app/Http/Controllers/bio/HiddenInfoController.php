<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioHiddenInfoRequest;
use App\Http\Resources\Bio\HiddenInfoResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\HiddenInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HiddenInfoController extends Controller
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

  public function store(StoreBioHiddenInfoRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has a HiddenInfo entry via the Bio model
      $existingHiddenInfo = HiddenInfo::where('bio_id', $bio->id)->first();

      if ($existingHiddenInfo) {
        // If a HiddenInfo already exists, return an error response
        return response()->json(['error' => 'You have already created a Hidden Information section.'], 403);
      }

      // Create the HiddenInfo record
      $hiddenInfo = HiddenInfo::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Fields used to calculate filled percentage for hidden information
      $hiddenInfoFields = [
        'name',
        'email',
        'location',
        'family_members_name',
        'current_parent',
        'parent_mobile',
        'social_links',
        'permanent_address_map_location',
        'present_address_map_location',
        'documents_link',
      ];

      $filledFields = 0;

      foreach ($hiddenInfoFields as $field) {
        if (!empty($hiddenInfo->$field)) {
          $filledFields++;
        }
      }

      // Calculate the percentage of filled information for HiddenInfo
      $hiddenInfoFilledMarks = ($filledFields / count($hiddenInfoFields)) * 100;

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id],
        [
          'hidden_info_filled_marks' => $hiddenInfoFilledMarks,
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for HiddenInfo
      return new HiddenInfoResource($hiddenInfo);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Log or handle the error as needed
      return response()->json(['error' => 'Unable to create records: ' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(HiddenInfo $hidden_info)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioHiddenInfoRequest $request, HiddenInfo $hidden_info)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Ensure the HiddenInfo belongs to the authenticated user
      $bio = Bio::where('user_id', auth()->id())->first();

      // Update the HiddenInfo record with the validated data
      $hidden_info->update($request->validated());

      // Fields used to calculate filled percentage for hidden information
      $hiddenInfoFields = [
        'name',
        'email',
        'location',
        'family_members_name',
        'current_parent',
        'parent_mobile',
        'social_links',
        'permanent_address_map_location',
        'present_address_map_location',
        'documents_link',
      ];

      $filledFields = 0;

      foreach ($hiddenInfoFields as $field) {
        if (!empty($hidden_info->$field)) {
          $filledFields++;
        }
      }

      // Calculate the percentage of filled information for HiddenInfo
      $hiddenInfoFilledMarks = ($filledFields / count($hiddenInfoFields)) * 100;

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id],
        [
          'hidden_info_filled_marks' => $hiddenInfoFilledMarks,
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for HiddenInfo
      return new HiddenInfoResource($hidden_info);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'Unable to update records: ' . $e->getMessage()], 500);
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(HiddenInfo $hidden_info)
  {
    //
  }
}