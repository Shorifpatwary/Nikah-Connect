<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bio\BioResource;
use App\Models\Bio;

class UserRecordController extends Controller
{
  public function getBioUserRecord($section)
  {
    // Define valid sections and their corresponding relations
    $sections = [
      'general' => 'generalSection',
      'location' => 'locationSection',
      'education' => 'educationSection',
      'personal-info' => 'personalDetails',
      'family' => 'familyInfoSection',
      'profession' => 'professionSection',
      'religious-activities' => 'religiousActivity',
      'marital-info' => 'marriageInfo',
      'expected-partner' => 'expectedPartner',
      'hidden-info' => 'hiddenInfo',
      'filled-marks' => 'filledMarks',
    ];

    // Check if the requested section is valid
    if (!isset($sections[$section])) {
      return response()->json(['message' => 'Invalid section requested.'], 400);
    }

    // Handle nested relations (e.g., 'general' -> 'locations')
    $relation = $sections[$section];

    // Define nested relations explicitly
    $nestedRelations = [
      'general' => ['generalSection', 'generalSection.location'],
      // Add more nested relations if needed
    ];

    // Determine if the section has nested relations
    $withRelations = $nestedRelations[$section] ?? [$relation];

    // Retrieve the bio of the authenticated user with the required relations
    $bio = Bio::with($withRelations)->where('user_id', auth()->id())->first();

    if (!$bio) {
      return response()->json(['message' => 'No bio found for the authenticated user.'], 404);
    }

    // Return the bio resource including the requested section
    return new BioResource($bio);
  }
}