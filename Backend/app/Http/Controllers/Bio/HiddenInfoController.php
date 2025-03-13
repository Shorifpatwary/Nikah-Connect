<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioHiddenInfoRequest;
use App\Http\Resources\Bio\HiddenInfoResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\HiddenInfo;
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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }
      // Check if the authenticated user already has a HiddenInfo entry via the Bio model

      if (HiddenInfo::where('bio_id', $bio->id)->exists()) {
        // If a HiddenInfo already exists, return an error response
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি গোপন তথ্য বিভাগ তৈরি করেছেন।'], 403);
      }

      // Create the HiddenInfo record
      $hiddenInfo = HiddenInfo::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));


      // Calculate the percentage of filled fields for HiddenInfo
      $hiddenInfoFilledMarks = $this->calculateFilledMarks($hiddenInfo);

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
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio || $hidden_info->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই গোপন তথ্য বিভাগটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }
      // Update the HiddenInfo record with the validated data
      $hidden_info->update($request->validated());

      // Calculate the percentage of filled fields for HiddenInfo
      $hiddenInfoFilledMarks = $this->calculateFilledMarks($hidden_info);

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
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(HiddenInfo $hidden_info)
  {
    //
  }



  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(HiddenInfo $hiddenInfo)
  {
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

    $filledFields = count(array_filter($hiddenInfoFields, fn($field) => !empty($hiddenInfo->$field) || $hiddenInfo->$field !== null));
    return ($filledFields / count($hiddenInfoFields)) * 100;
  }
}
