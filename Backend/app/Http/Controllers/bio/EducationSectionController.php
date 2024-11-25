<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioEducationRequest;
use App\Http\Resources\Bio\EducationSectionResource;
use App\Models\Bio;
use App\Models\EducationSection;
use App\Models\FilledMarks;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationSectionController extends Controller
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
  public function store(StoreBioEducationRequest $request)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Retrieve the authenticated user's bio ID
      $bio = Bio::where('user_id', auth()->id())->first();

      // Check if the authenticated user already has an EducationSection via the Bio model
      $existingEducationSection = EducationSection::where('bio_id', $bio->id)->first();

      if ($existingEducationSection) {
        // If a Bio already exists, return an error response
        return response()->json(['error' => 'You have already created an Education Section.'], 403);
      }

      // Create the EducationSection record
      $educationSection = EducationSection::create(array_merge($request->validated(), [
        'bio_id' => $bio->id,
      ]));

      // Calculate percentage of education information filled
      $educationFields = [
        'highest_qualification',
        'current_study',
        'previous_exams',
        'other_qualifications',
      ];

      $filledFields = 0;

      foreach ($educationFields as $field) {
        if (!empty($educationSection->$field)) {
          $filledFields++;
        }
      }

      $educationFilledMarks = ($filledFields / count($educationFields)) * 100; // Calculate percentage

      // Create or update the FilledMarks record with calculated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'education_filled_marks' => $educationFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the created resource for EducationSection
      return new EducationSectionResource($educationSection);
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
  public function show(EducationSection $educationSection)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */ public function update(StoreBioEducationRequest $request, EducationSection $education)
  {
    // Begin a database transaction
    DB::beginTransaction();

    try {
      // Ensure the EducationSection belongs to the authenticated user
      $bio = Bio::where('user_id', auth()->id())->first();

      // Uncomment and ensure correct check for authorized access, if needed
      // if (!$bio || $education->bio_id !== $bio->id) {
      //     return response()->json(['error' => 'Unauthorized access to this resource.'], 403);
      // }

      // Update the EducationSection record
      $education->update($request->validated());

      // Calculate percentage of education information filled
      $educationFields = [
        'highest_qualification',
        'current_study',
        'previous_exams',
        'other_qualifications',
      ];

      $filledFields = 0;

      foreach ($educationFields as $field) {
        if (!empty($education->$field)) {
          $filledFields++;
        }
      }

      $educationFilledMarks = ($filledFields / count($educationFields)) * 100; // Calculate percentage

      // Update or create the FilledMarks record with the updated filled marks
      FilledMarks::updateOrCreate(
        ['bio_id' => $bio->id], // Condition to check if a FilledMarks record exists for this bio
        [
          'education_filled_marks' => $educationFilledMarks,
          // Add other filled marks columns if needed
        ]
      );

      // Commit the transaction
      DB::commit();

      // Return the updated resource for EducationSection
      return new EducationSectionResource($education);
    } catch (\Exception $e) {
      // Rollback the transaction if there's an error
      DB::rollBack();
      return response()->json(['error' => 'Unable to update records.' . $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(EducationSection $education)
  {
    //
  }
}