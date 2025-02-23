<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioReligiousActivitiesRequest;
use App\Http\Resources\Bio\ReligiousActivityResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use App\Models\ReligiousActivity;
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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio) {
        return response()->json(['error' => 'আপনার বায়ো রেকর্ড পাওয়া যায়নি।'], 404);
      }

      // Check if the authenticated user already has a ReligiousActivity entry via the Bio model
      if (ReligiousActivity::where('bio_id', $bio->id)->exists()) {
        return response()->json(['error' => 'আপনি ইতিমধ্যে একটি ধর্মীয় কার্যক্রমের রেকর্ড তৈরি করেছেন।'], 403);
      }

      // Create the ReligiousActivity record
      $religiousActivity = ReligiousActivity::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate the percentage of filled fields for ReligiousActivity
      $religiousFilledMarks = $this->calculateFilledMarks($religiousActivity);

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
      return response()->json(['error' => 'রেকর্ড তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' . $e->getMessage()], 500);
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
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();

      if (!$bio || $religious_activity->bio_id !== $bio->id) {
        return response()->json(['error' => 'এই ধর্মীয় কার্যক্রম সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }
      // Update the ReligiousActivity record with the validated data
      $religious_activity->update($request->validated());

      // Calculate the percentage of filled fields for ReligiousActivity
      $religiousFilledMarks = $this->calculateFilledMarks($religious_activity);

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
      return response()->json(['error' => 'রেকর্ড আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন। ' . $e->getMessage()], 500);
    }
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ReligiousActivity $religious_activity)
  {
    //
  }

  /**
   * Helper function to calculate the filled marks percentage.
   */
  private function calculateFilledMarks(ReligiousActivity $religiousActivity)
  {
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

    $filledFields = count(array_filter($religiousFields, fn($field) => !empty($religiousActivity->$field) || $religiousActivity->$field !== null));
    return ($filledFields / count($religiousFields)) * 100;
  }
}
