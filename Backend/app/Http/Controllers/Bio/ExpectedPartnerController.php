<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioExpectedPartnerRequest;
use App\Http\Resources\Bio\ExpectedPartnerResource;
use App\Models\Bio;
use App\Models\ExpectedPartner;
use App\Models\FilledMarks;
use Illuminate\Support\Facades\DB;

class ExpectedPartnerController extends Controller
{

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreBioExpectedPartnerRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }

      // Check for existing ExpectedPartner entry
      if (ExpectedPartner::where('bio_id', $bio->id)->exists()) {
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি প্রত্যাশিত পার্টনার এন্ট্রি তৈরি করেছেন।'], 403);
      }

      // Create ExpectedPartner record
      $expectedPartner = ExpectedPartner::create(array_merge($request->validated(), [
        'complexion' => is_array($request->complexion) ? implode(', ', $request->complexion) : $request->complexion,
        'marital_status' => is_array($request->marital_status) ? implode(', ', $request->marital_status) : $request->marital_status,
        'bio_profile_types' => is_array($request->bio_profile_types) ? implode(', ', $request->bio_profile_types) : $request->bio_profile_types,
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for the ExpectedPartner
      $expectedPartnerFilledMarks = $this->calculateFilledMarks($expectedPartner);

      // Update FilledMarks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id],
        ['expected_partner_filled_marks' => $expectedPartnerFilledMarks]
      );

      // Commit the transaction
      DB::commit();

      return new ExpectedPartnerResource($expectedPartner);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioExpectedPartnerRequest $request, ExpectedPartner $expected_partner)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $expected_partner->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }

      // Update the ExpectedPartner record
      $expected_partner->update(array_merge($request->validated(), [
        'complexion' => is_array($request->complexion) ? implode(', ', $request->complexion) : $request->complexion,
        'marital_status' => is_array($request->marital_status) ? implode(', ', $request->marital_status) : $request->marital_status,
        'bio_profile_types' => is_array($request->bio_profile_types) ? implode(', ', $request->bio_profile_types) : $request->bio_profile_types,
      ]));

      // Calculate the percentage of filled fields for the ExpectedPartner
      $expectedPartnerFilledMarks = $this->calculateFilledMarks($expected_partner);

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id],
        ['expected_partner_filled_marks' => $expectedPartnerFilledMarks]
      );

      // Commit the transaction
      DB::commit();

      return new ExpectedPartnerResource($expected_partner);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ExpectedPartner $expected_partner)
  {
    //
  }

  /**
   * Helper function to calculate the filled marks percentage
   */
  private function calculateFilledMarks(ExpectedPartner $expected_partner)
  {
    $expectedPartnerFields = [
      'age',
      'complexion',
      'height',
      'marital_status',
      'educational_qualification',
      'profession',
      'economic_status',
      'bio_profile_types',
      'family',
      'about_partner',
    ];

    $filledFields = count(array_filter($expectedPartnerFields, fn($field) => !empty($expected_partner->$field) || $expected_partner->$field !== null));
    return ($filledFields / count($expectedPartnerFields)) * 100;
  }
}