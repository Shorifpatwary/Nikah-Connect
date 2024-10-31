<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioMarriageInfoRequest;
use App\Http\Resources\Bio\MarriageInfoResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\MarriageInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarriageInfoController extends Controller
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
  public function store(StoreBioMarriageInfoRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has a MarriageInfo entry via the Bio model
      $existingMarriageInfo = MarriageInfo::where('bio_id', $bio->id)->first();

      if ($existingMarriageInfo) {
        // If a MarriageInfo already exists, return an error response
        return response()->json(['error' => 'You have already created a Marriage Information entry.'], 403);
      }

      // Create the MarriageInfo record
      $marriageInfo = MarriageInfo::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of marriage information filled
      $marriageFields = [
        'prev_marriage',
        'work_after',
        'study_after',
        'ceremony_plans',
        'partner_view_rules',
        'marriage_weakness',
        'family_pref',
        'compromise_factors',
        'dowry_amount',
        'dowry_opinion',
        'cash_gift_opinion',
      ];

      $filledFields = 0;

      foreach ($marriageFields as $field) {
        if (!empty($marriageInfo->$field)) {
          $filledFields++;
        }
      }

      $marriageFilledMarks = ($filledFields / count($marriageFields)) * 100; // Calculate percentage

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'marriage_info_filled_marks' => $marriageFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for MarriageInfo
      return new MarriageInfoResource($marriageInfo);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();

      // Handle the error, e.g., log it, return an error response, etc.
      return response()->json(['error' => 'Unable to create records. ' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(MarriageInfo $marriageInfo)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, MarriageInfo $marriageInfo)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(MarriageInfo $marriageInfo)
  {
    //
  }
}