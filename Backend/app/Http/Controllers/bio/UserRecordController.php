<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bio\EducationSectionResource;
use App\Http\Resources\Bio\ExpectedPartnerResource;
use App\Http\Resources\Bio\FamilyInfoResource;
use App\Http\Resources\Bio\GeneralSectionResource;
use App\Http\Resources\Bio\HiddenInfoResource;
use App\Http\Resources\Bio\LocationSectionResource;
use App\Http\Resources\Bio\MarriageInfoResource;
use App\Http\Resources\Bio\PersonalDetailsSectionResource;
use App\Http\Resources\Bio\ProfessionResource;
use App\Http\Resources\Bio\ReligiousActivityResource;
use App\Models\Bio;
use App\Models\EducationSection;
use App\Models\ExpectedPartner;
use App\Models\FamilyInfoSection;
use App\Models\GeneralSection;
use App\Models\HiddenInfo;
use App\Models\LocationSection;
use App\Models\MarriageInfo;
use App\Models\PersonalDetails;
use App\Models\ProfessionSection;
use App\Models\ReligiousActivity;

class UserRecordController extends Controller
{
  public function getBioUserRecord($section)
  {
    // Map sections to their corresponding models and resources
    $sections = [
      'general' => [
        'model' => GeneralSection::class,
        'resource' => GeneralSectionResource::class,
        'relations' => ['location'],
      ],
      'location' => ['model' => LocationSection::class, 'resource' => LocationSectionResource::class],
      'education' => ['model' => EducationSection::class, 'resource' => EducationSectionResource::class],
      'personal-info' => ['model' => PersonalDetails::class, 'resource' => PersonalDetailsSectionResource::class],
      'family' => ['model' => FamilyInfoSection::class, 'resource' => FamilyInfoResource::class],
      'profession' => ['model' => ProfessionSection::class, 'resource' => ProfessionResource::class],
      'religious-activities' => ['model' => ReligiousActivity::class, 'resource' => ReligiousActivityResource::class],
      'marital-info' => ['model' => MarriageInfo::class, 'resource' => MarriageInfoResource::class],
      'expected-partner' => ['model' => ExpectedPartner::class, 'resource' => ExpectedPartnerResource::class],
      'hidden-info' => ['model' => HiddenInfo::class, 'resource' => HiddenInfoResource::class],
    ];

    // Validate the requested section
    if (!isset($sections[$section])) {
      return response()->json(['message' => 'Invalid section requested.'], 400);
    }

    $bio = Bio::where('user_id', auth()->id())->first();

    if (!$bio) {
      return response()->json(['message' => 'No bio found for the authenticated user.'], 404);
    }

    // Get the model and resource
    $model = $sections[$section]['model'];
    $resource = $sections[$section]['resource'];
    $relations = $sections[$section]['relations'] ?? []; // Default to no relations

    // Fetch the record with relations if any
    $query = $model::where('bio_id', $bio->id);
    if (!empty($relations)) {
      $query->with($relations);
    }
    $record = $query->first();

    if (!$record) {
      return response()->json(['message' => ucfirst(str_replace('-', ' ', $section)) . ' not found.'], 404);
    }

    // Return the resource
    return new $resource($record);
  }
}