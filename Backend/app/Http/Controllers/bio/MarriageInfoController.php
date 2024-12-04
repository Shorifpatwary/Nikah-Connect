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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }

      // Check if the authenticated user already has a MarriageInfo via the Bio model
      if (MarriageInfo::where('bio_id', $bio->id)->exists()) {
        // If a MarriageInfo already exists, return an error response
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি বিবাহ তথ্য রেকর্ড তৈরি করেছেন।'], 403);
      }

      // Create the MarriageInfo record
      $marriageInfo  = MarriageInfo::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for MarriageInfo
      $marriageFilledMarks  = $this->calculateFilledMarks($marriageInfo);

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'marital_info_filled_marks' => $marriageFilledMarks,
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
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(MarriageInfo $marriage_info)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioMarriageInfoRequest $request, MarriageInfo $marriage_info)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $marriage_info->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }
      // Update the MarriageInfo record with the validated data
      $marriage_info->update($request->validated());

      // Calculate the percentage of filled fields for MarriageInfo
      $marriageFilledMarks = $this->calculateFilledMarks($marriage_info);

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'marital_info_filled_marks' => $marriageFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for MarriageInfo
      return new MarriageInfoResource($marriage_info);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(MarriageInfo $marriage_info)
  {
    //
  }

  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(MarriageInfo $marriageInfo)
  {
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

    $filledFields = count(array_filter($marriageFields, fn($field) => !empty($marriageInfo->$field) || $marriageInfo->$field !== null));
    return ($filledFields / count($marriageFields)) * 100;
  }
}
