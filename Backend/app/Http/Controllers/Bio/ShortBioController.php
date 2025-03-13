<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreShortBio;
use App\Models\Bio;
use App\Models\EducationSection;
use App\Models\FamilyInfoSection;
use App\Models\GeneralSection;
use App\Models\HiddenInfo;
use App\Models\Location;
use App\Models\LocationSection;
use App\Models\MarriageInfo;
use App\Models\ProfessionSection;
use App\Models\ReligiousActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShortBioController extends Controller
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
  public function store(StoreShortBio $request)
  {
    DB::beginTransaction();
    try {
      // Check if the user already has a bio
      if ($existingBio = Bio::where('user_id', auth()->id())->first()) {
        return response()->json([
          'message' => 'Bio already exists for this user.',
          'bio_id' => $existingBio->id
        ], 403);
      }

      // Fetch location data using location_id
      $location = Location::find($request->input('location_id'));
      $locationName = $location ? $location->name . ' ' . $location->type : 'অজানা ঠিকানা';

      // Create the Bio record
      $bio = Bio::create([
        'title' => implode(' | ', [
          'বায়ো ডাটার ধরনঃ ' . $request->input('gender'),
          $request->input('marital_status'),
          'জন্মঃ ' . $request->input('birth_date'),
          'ঠিকানাঃ ' . $locationName,
        ]),
        'status' => 'pending_approval',
        'bio_profile' => $request->input('gender') === 'পাত্র' ? 'SHORT_MALE' : ($request->input('gender') === 'পাত্রী' ? 'SHORT_FEMALE' : null),
        'type' => 'SHORT',
        'user_id' => auth()->id(),
      ]);

      // Create sections and update filled marks for each section
      $this->updateSectionAndFilledMarks(GeneralSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(LocationSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(EducationSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(FamilyInfoSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(ProfessionSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(ReligiousActivity::class, $bio, $request);
      $this->updateSectionAndFilledMarks(MarriageInfo::class, $bio, $request);
      $this->updateSectionAndFilledMarks(HiddenInfo::class, $bio, $request);

      // Commit the transaction
      DB::commit();
      return response()->json(['message' => 'Short bio created successfully.', 'bio_id' => $bio->id], 201);
    } catch (\Exception $e) {
      // Rollback the transaction if anything goes wrong
      DB::rollBack();
      return response()->json(['error' => 'An error occurred while creating the short bio.', 'details' => $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreShortBio $request, Bio $short)
  {
    DB::beginTransaction();
    try {
      // Retrieve the authenticated user's bio
      $bio = Bio::where('user_id', auth()->id())->first();
      //  || $bio->id !== $short
      if (!$bio) {
        return response()->json(['error' => 'আপনার এই বায়োডাটাটি সম্পাদনা করার জন্য আপনার অনুমতি নেই।'], 403);
      }

      // Fetch location data using location_id
      $location = Location::find($request->input('location_id'));
      $locationName = $location ? $location->name . ' ' . $location->type : 'অজানা ঠিকানা';

      // Update the bio record
      $bio->update([
        'title' => implode(' | ', [
          'বায়ো ডাটার ধরনঃ ' . $request->input('gender'),
          $request->input('marital_status'),
          'জন্মঃ ' . $request->input('birth_date'),
          'ঠিকানাঃ ' . $locationName,
        ]),
      ]);

      // Update sections and their filled marks for each section
      $this->updateSectionAndFilledMarks(GeneralSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(LocationSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(EducationSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(FamilyInfoSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(ProfessionSection::class, $bio, $request);
      $this->updateSectionAndFilledMarks(ReligiousActivity::class, $bio, $request);
      $this->updateSectionAndFilledMarks(MarriageInfo::class, $bio, $request);
      $this->updateSectionAndFilledMarks(HiddenInfo::class, $bio, $request);

      // Commit the transaction
      DB::commit();
      return response()->json(['message' => 'Short bio updated successfully.', 'bio_id' => $bio->id], 200);
    } catch (\Exception $e) {
      // Rollback the transaction if anything goes wrong
      DB::rollBack();
      return response()->json(['error' => 'An error occurred while updating the short bio.', 'details' => $e->getMessage()], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
  private function updateSectionAndFilledMarks(string $sectionClass, Bio $bio, Request $request)
  {
    // Get fillable fields for the section
    $fillableFields = (new $sectionClass)->getFillable();

    // Extract only the relevant fields from the request
    $data = $request->only($fillableFields);

    // If no valid fields are provided, return without creating/updating
    if (empty(array_filter($data))) {
      return;
    }

    // Ensure bio_id is set
    $data['bio_id'] = $bio->id;

    // Update or create the section data
    $section = $sectionClass::updateOrCreate(['bio_id' => $bio->id], $data);

    // Update or create filled marks for the section
    FilledMarksController::updateFilledMarks($sectionClass, $bio, $request);
  }
}