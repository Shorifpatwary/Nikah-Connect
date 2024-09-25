<?php

namespace App\Http\Controllers;

use App\Http\Resources\Bio\FilledMarksResource;
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
    // Access bio via the user's bio_id in users table
    $bio = $user->bio;

    if ($bio && $bio->filledMarks) {
      return new FilledMarksResource($bio->filledMarks);
    }

    return response()->json(['message' => 'No filled marks data found for this user.'], 404);
  }
}