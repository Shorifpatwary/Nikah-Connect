<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioExpectedPartnerRequest;
use App\Http\Resources\Bio\ExpectedPartnerResource;
use App\Models\Bio;
use App\Models\ExpectedPartner;
use App\Models\FilledMarks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpectedPartnerController extends Controller
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
  public function store(StoreBioExpectedPartnerRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has an ExpectedPartner entry via the Bio model
      $existingExpectedPartner = ExpectedPartner::where('bio_id', $bio->id)->first();

      if ($existingExpectedPartner) {
        // If an ExpectedPartner already exists, return an error response
        return response()->json(['error' => 'You have already created an Expected Partner entry.'], 403);
      }

      // Create the ExpectedPartner record
      $expectedPartner = ExpectedPartner::create(array_merge($request->validated(), [
        'complexion' => is_array($request->complexion) ? implode(', ', $request->complexion) : $request->complexion,
        'marital_status' => is_array($request->marital_status) ? implode(', ', $request->marital_status) : $request->marital_status,
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of expected partner information filled
      $expectedPartnerFields = [
        'age',
        'complexion',
        'height',
        'marital_status',
        'educational_qualification',
        'profession',
        'economic_status',
        'family',
        'about_partner',
      ];

      $filledFields = 0;

      foreach ($expectedPartnerFields as $field) {
        if (!empty($expectedPartner->$field)) {
          $filledFields++;
        }
      }

      $expectedPartnerFilledMarks = ($filledFields / count($expectedPartnerFields)) * 100; // Calculate percentage

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'expected_partner_filled_marks' => $expectedPartnerFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for ExpectedPartner
      return new ExpectedPartnerResource($expectedPartner);
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
  public function show(ExpectedPartner $expected_partner)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreBioExpectedPartnerRequest $request, ExpectedPartner $expected_partner)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Ensure the ExpectedPartner belongs to the authenticated user
      $bio = Bio::where('user_id', auth()->id())->first();

      // Update the ExpectedPartner record with the validated data
      $expected_partner->update(array_merge($request->validated(), [
        'complexion' => is_array($request->complexion) ? implode(', ', $request->complexion) : $request->complexion,
        'marital_status' => is_array($request->marital_status) ? implode(', ', $request->marital_status) : $request->marital_status,
      ]));

      // Calculate percentage of expected partner information filled
      $expectedPartnerFields = [
        'age',
        'complexion',
        'height',
        'marital_status',
        'educational_qualification',
        'profession',
        'economic_status',
        'family',
        'about_partner',
      ];

      $filledFields = 0;

      foreach ($expectedPartnerFields as $field) {
        if (!empty($expected_partner->$field)) {
          $filledFields++;
        }
      }

      $expectedPartnerFilledMarks = ($filledFields / count($expectedPartnerFields)) * 100; // Calculate percentage

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'expected_partner_filled_marks' => $expectedPartnerFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for ExpectedPartner
      return new ExpectedPartnerResource($expected_partner);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'Unable to update records. ' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ExpectedPartner $expected_partner)
  {
    //
  }
}