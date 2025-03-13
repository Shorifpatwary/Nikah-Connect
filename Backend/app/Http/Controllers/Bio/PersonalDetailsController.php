<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioPersonalDetailsRequest;
use App\Http\Resources\Bio\PersonalDetailsSectionResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\PersonalDetails;
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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }
      // Check if the authenticated user already has a PersonalDetails entry via the Bio model
      if (PersonalDetails::where('bio_id', $bio->id)->exists()) {
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি ব্যক্তিগত তথ্য রেকর্ড তৈরি করেছেন।'], 403);
      }

      // Create the PersonalDetail record
      $personalDetail = PersonalDetails::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for PersonalDetails
      $personalFilledMarks = $this->calculateFilledMarks($personalDetail);

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
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $personal_detail->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই ব্যক্তিগত তথ্য রেকর্ডটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }
      // Update the PersonalDetails record
      $personal_detail->update($request->validated());

      // Calculate the percentage of filled fields for PersonalDetails
      $personalFilledMarks = $this->calculateFilledMarks($personal_detail);

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
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(PersonalDetails $personal_detail)
  {
    //
  }

  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(PersonalDetails $personalDetail)
  {
    $personalFields = [
      'about_yourself',
      'outdoor_clothing',
      'physical_mental_illness',
      'favorite_books',
      'favorite_online_personalities',
      'device_usage_time',
      'affiliations',
    ];

    $filledFields = count(array_filter($personalFields, fn($field) => !empty($personalDetail->$field) || $personalDetail->$field !== null));
    return ($filledFields / count($personalFields)) * 100;
  }
}
