<?php

namespace App\Http\Controllers\Bio;

use App\Enums\StatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioRequest;
use App\Http\Requests\Admin\Bio\UpdateBioRequest;

use App\Http\Resources\Bio\BioResource;
use App\Models\Bio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class BioController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $query = Bio::query()
      ->with(['generalSection:id,bio_id,gender,height,weight,complexion,location_id', 'generalSection.location:id,name', 'tags:id,name'])
      ->select(['bios.id', 'bios.title', 'bios.status', 'bios.updated_at']);

    // Apply filters
    if ($request->has('filter')) {
      foreach ($request->input('filter') as $field => $value) {
        if ($value !== null) {
          $query->where($field, $value);
        }
      }
    }

    // Apply sorting
    if ($request->has('sort')) {
      $sortField = $request->input('sort', 'created_at');
      $sortDirection = $request->input('sort_direction', 'asc');

      // Ensure sort direction is either 'asc' or 'desc'
      $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';

      $generalSectionSortFields = ['gender', 'height', 'weight', 'complexion'];

      if (in_array($sortField, $generalSectionSortFields)) {
        // Join the GeneralSection table
        $query->join('general_sections', 'bios.id', '=', 'general_sections.bio_id')
          ->orderBy('general_sections.' . $sortField, $sortDirection);
      } else {
        // Sort on user_infos fields
        $query->orderBy('bios.' . $sortField, $sortDirection);
      }
    }

    // Apply search
    if ($request->has('search')) {
      $search = $request->input('search');
      $query->where(function ($q) use ($search) {
        $q->where('title', 'LIKE', '%' . $search . '%')
          ->orWhere('id', 'LIKE', '%' . $search . '%')
          ->orWhereHas('tags', function ($query) use ($search) {
            $query->where('search_text', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('locationSection', function ($query) use ($search) {
            $query->where('permanent_address', 'LIKE', '%' . $search . '%')
              ->orWhere('present_address', 'LIKE', '%' . $search . '%')
              ->orWhere('relocate_plan', 'LIKE', '%' . $search . '%')
              ->orWhere('childhood_address', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('educationSection', function ($query) use ($search) {
            $query->where('education_medium', 'LIKE', '%' . $search . '%')
              ->orWhere('highest_qualification', 'LIKE', '%' . $search . '%')
              ->orWhere('current_study', 'LIKE', '%' . $search . '%')
              ->orWhere('previous_exams', 'LIKE', '%' . $search . '%')
              ->orWhere('other_qualifications', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('personalDetails', function ($query) use ($search) {
            $query->where('about_yourself', 'LIKE', '%' . $search . '%')
              ->orWhere('outdoor_clothing', 'LIKE', '%' . $search . '%')
              ->orWhere('physical_mental_illness', 'LIKE', '%' . $search . '%')
              ->orWhere('favorite_books', 'LIKE', '%' . $search . '%')
              ->orWhere('favorite_online_personalities', 'LIKE', '%' . $search . '%')
              ->orWhere('affiliations', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('familyInfoSection', function ($query) use ($search) {
            $query->where('family_members_info', 'LIKE', '%' . $search . '%')
              ->orWhere('uncles_info', 'LIKE', '%' . $search . '%')
              ->orWhere('economic_status', 'LIKE', '%' . $search . '%')
              ->orWhere('economic_status_details', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('professionSection', function ($query) use ($search) {
            $query->where('profession', 'LIKE', '%' . $search . '%')
              ->orWhere('profession_description', 'LIKE', '%' . $search . '%')
              ->orWhere('monthly_income', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('marriageInfo', function ($query) use ($search) {
            $query->where('prev_marriage', 'LIKE', '%' . $search . '%')
              ->orWhere('marriage_weakness', 'LIKE', '%' . $search . '%')
              ->orWhere('compromise_factors', 'LIKE', '%' . $search . '%');
          })
          ->orWhereHas('religiousActivity', function ($query) use ($search) {
            $query->where('prayer_habits', 'LIKE', '%' . $search . '%')
              ->orWhere('religious_knowledge', 'LIKE', '%' . $search . '%')
              ->orWhere('mazhab', 'LIKE', '%' . $search . '%');
          });
      });
    }

    // Apply pagination
    $perPage = $request->input('per_page', 20);
    $currentPage = $request->input('page', 1);

    $bios = $query->paginate($perPage, ['*'], 'page', $currentPage);

    // Return the collection of bios as a paginated resource
    return BioResource::collection($bios);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreBioRequest $request)
  {
    $bio = Bio::create($request->validated());

    if ($request->has('tags')) {
      $bio->tags()->attach($request->input('tags'));
    }

    return new BioResource($bio);
  }

  /**
   * Display the specified resource.
   */
  public function show(Bio $bio)
  {
    $bio->load([
      'tags',
      'generalSection',
      'locationSection',
      'educationSection',
      'personalDetails',
      'familyInfoSection',
      'professionSection',
      'religiousActivity',
      'marriageInfo',
      'expectedPartner'
    ]);

    return new BioResource($bio);
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateBioRequest $request, Bio $bio)
  {
    $bio->update($request->validated());

    if ($request->has('tags')) {
      $bio->tags()->sync($request->input('tags'));
    }

    return new BioResource($bio);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Bio $bio)
  {
    $bio->delete();
    return response()->json([
      'message' => 'Bio deleted successfully.'
    ]);
  }

  /**
   * Update the authenticated resource types and status in storage.
   */
  public function updateStatusesAndTypes(Request $request)
  {
    $user = Auth::user();
    $bio = $user->bio;

    if (!$bio) {
      return response()->json(['message' => 'Bio not found'], 404);
    }

    // Validate inputs (all optional)
    $validated = $request->validate([
      'bio_profile' => ['nullable', Rule::in(StatusEnum::BIO_PROFILE_TYPES)],
      'status' => ['nullable', Rule::in(StatusEnum::BIO_STATUS)],
      'type' => ['nullable', Rule::in(StatusEnum::BIO__TYPES)],
    ]);

    // Check if status is provided and is not in the allowed values
    if (isset($validated['status']) && !in_array($validated['status'], ['approved', 'married', 'inactive'])) {
      return response()->json([
        'error' => 'বৈধ স্ট্যাটাস নির্বাচন করা আবশ্যক।'
      ], 422);
    }

    // Update only the provided fields
    $bio->fill($validated);

    // Only save if there are changes
    if ($bio->isDirty()) {
      $bio->save();
    }

    return new BioResource($bio);
  }
  public function userRecord()
  {
    $bio = Bio::where('user_id', auth()->id())->first();

    if (!$bio) {
      return response()->json(['error' => 'আপনার জন্য কোনো বায়োডাটা খুঁজে পাওয়া যায়নি।'], 404);
    }

    $bio->load([
      'tags',
      'generalSection.location',
      'locationSection',
      'educationSection',
      'personalDetails',
      'familyInfoSection',
      'professionSection',
      'religiousActivity',
      'marriageInfo',
      'expectedPartner',
      'hiddenInfo'
    ]);

    return new BioResource($bio);
  }

  public function bioAuthenticatedUserDetail()
  {
    // return new BioResource($bio);
  }

  public function approveRequest()
  {
    $bio = Bio::where('user_id', auth()->id())->firstOrFail();
    $maritalStatus = $bio->generalSection?->marital_status;

    if ($this->isBioComplete($bio, $maritalStatus)) {
      $bio->update(['status' => 'pending_approval']);

      return response()->json([
        'message' => 'বায়ো এপ্রুব রিকোয়েষ্ট সফলভাবে পাঠানো হয়েছে।',
        'status' => $bio->status,
      ]);
    }

    return response()->json([
      'error' => 'সমস্ত প্রয়োজনীয় প্রশ্নের উত্তর সঠিকভাবে পূরণ করা হয়নি।',
    ], 422);
  }

  /**
   * Check if required fields are filled based on bio type.
   */
  private function isBioComplete($bio, $maritalStatus)
  {
    $commonFields = [
      // General Section
      $bio->generalSection?->gender,
      $bio->generalSection?->marital_status,
      $bio->generalSection?->birth_date,
      $bio->generalSection?->height,
      $bio->generalSection?->weight,
      $bio->generalSection?->complexion,
      $bio->generalSection?->blood_group,
      $bio->generalSection?->location_id,

      // Location Section
      $bio->location_section?->permanent_address,

      // Education Section
      $bio->education_section?->education_medium,
      $bio->education_section?->previous_exams,

      // Personal Details Section
      $bio->personal_details?->about_yourself,

      // Family Information Section
      $bio->family_info_sections?->family_members_info,
      $bio->family_info_sections?->economic_status,

      // Profession Section
      $bio->profession_section?->profession,
      $bio->profession_section?->profession_description,

      // Religious Activity Section
      $bio->religious_activity?->mazhab,

      // Hidden Info Section
      $bio->hidden_info?->name,
      $bio->hidden_info?->email,
      $bio->hidden_info?->location,
      $bio->hidden_info?->family_members_name,
      $bio->hidden_info?->current_parent,
      $bio->hidden_info?->parent_mobile,
    ];

    if ($maritalStatus !== 'অবিবাহিত') {
      $commonFields[] = $bio->marriage_info?->prev_marriage;
    }

    if ($bio->type === "LONG") {
      $extraFields = [
        // Additional Education Fields
        $bio->education_section?->highest_qualification,

        // Additional Personal Details
        $bio->personal_details?->outdoor_clothing,
        $bio->personal_details?->physical_mental_illness,

        // Additional Family Info
        $bio->family_info_sections?->economic_status_details,

        // Additional Profession Info
        $bio->profession_section?->monthly_income,

        // Additional Religious Activity Info
        $bio->religious_activity?->prayer_habits,

        // Additional Marriage Info
        $bio->marriage_info?->work_after,
        $bio->marriage_info?->study_after,
        $bio->marriage_info?->ceremony_plans,
        $bio->marriage_info?->partner_view_rules,
        $bio->marriage_info?->marriage_weakness,
        $bio->marriage_info?->family_pref,
        $bio->marriage_info?->compromise_factors,
        $bio->marriage_info?->dowry_amount,
        $bio->marriage_info?->dowry_opinion,
        $bio->marriage_info?->cash_gift_opinion,

        // Expected Partner Section
        $bio->expected_partner?->age,
        $bio->expected_partner?->complexion,
        $bio->expected_partner?->height,
        $bio->expected_partner?->marital_status,
        $bio->expected_partner?->educational_qualification,
        $bio->expected_partner?->profession,
        $bio->expected_partner?->economic_status,
        $bio->expected_partner?->bio_profile_types,
      ];
      $commonFields = array_merge($commonFields, $extraFields);
    }

    return collect($commonFields)->every(fn($field) => filled($field));
  }
}