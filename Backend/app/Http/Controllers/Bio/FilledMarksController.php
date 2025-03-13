<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bio\BioResource;
use App\Http\Resources\Bio\FilledMarksResource;
use App\Models\Bio;
use App\Models\FilledMarks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FilledMarksController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $filledMarks = FilledMarks::all();
    return FilledMarksResource::collection($filledMarks);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'general_filled_marks' => 'nullable|integer',
      'location_filled_marks' => 'nullable|integer',
      'education_filled_marks' => 'nullable|integer',
      'personal_info_filled_marks' => 'nullable|integer',
      'family_filled_marks' => 'nullable|integer',
      'profession_filled_marks' => 'nullable|integer',
      'religious_activity_filled_marks' => 'nullable|integer',
      'marital_info_filled_marks' => 'nullable|integer',
      'expected_partner_filled_marks' => 'nullable|integer',
      'hidden_info_filled_marks' => 'nullable|integer',
      'bio_id' => 'required|exists:bios,id',
    ]);

    $filledMark = FilledMarks::create($validatedData);

    return new FilledMarksResource($filledMark);
  }

  /**
   * Display the specified resource.
   */
  public function show(FilledMarks $filledMarks)
  {
    return new FilledMarksResource($filledMarks);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, FilledMarks $filledMarks)
  {
    $validatedData = $request->validate([
      'general_filled_marks' => 'nullable|integer',
      'location_filled_marks' => 'nullable|integer',
      'education_filled_marks' => 'nullable|integer',
      'personal_info_filled_marks' => 'nullable|integer',
      'family_filled_marks' => 'nullable|integer',
      'profession_filled_marks' => 'nullable|integer',
      'religious_activity_filled_marks' => 'nullable|integer',
      'marital_info_filled_marks' => 'nullable|integer',
      'expected_partner_filled_marks' => 'nullable|integer',
      'hidden_info_filled_marks' => 'nullable|integer',
      'bio_id' => 'required|exists:bios,id',
    ]);

    $filledMarks->update($validatedData);

    return new FilledMarksResource($filledMarks);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(FilledMarks $filledMarks)
  {
    $filledMarks->delete();
    return response()->noContent();
  }

  // Method to show filled marks for the logged-in user
  public function userFilledMarks()
  {
    $user = Auth::user();
    $bio = $user->bio;

    if ($bio) {
      return new BioResource($bio->load('filledMarks'));
    }

    return response()->json(['message' => 'No filled marks data found for this user.'], 404);
  }

  public static function updateFilledMarks(string $sectionClass, Bio $bio, Request $request)
  {
    $fillableFields = (new $sectionClass)->getFillable();
    $section = $sectionClass::where('bio_id', $bio->id)->first();

    if ($section) {
      // Define the fields to exclude from the calculation dynamically
      $excludedFields = ['bio_id'];  // Add more fields as needed
      // Calculate filled marks for this section
      $filledMarks = self::calculateFilledMarks($section, $fillableFields, $excludedFields);

      // Get the key for filled marks directly from the section class, assuming the key is defined as a constant or similar
      $filledMarksKey = $sectionClass::FILLED_MARKS_KEY;

      // Update or create FilledMarks record with the appropriate key
      FilledMarks::updateOrCreate(
        ['bio_id' => $section->bio->id],
        [$filledMarksKey => $filledMarks]
      );
    }
  }

  private static function calculateFilledMarks($section, array $fillableFields, array $excludedFields = [])
  {
    $filledFields = 0;
    $totalFields = count($fillableFields);

    foreach ($fillableFields as $field) {
      // Skip the excluded fields
      if (in_array($field, $excludedFields)) {
        continue;
      }

      // Check if the field is filled
      if (!empty($section->$field) || $section->$field !== null) {
        $filledFields++;
      }
    }

    // Prevent division by zero if no valid fields are provided
    if ($totalFields - count($excludedFields) > 0) {
      return ($filledFields / ($totalFields - count($excludedFields))) * 100;
    } else {
      return 0; // No valid fields, return 0%
    }
  }
}