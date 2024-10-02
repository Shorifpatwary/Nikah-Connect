<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioRequest;
use App\Http\Requests\Admin\Bio\UpdateBioRequest;

use App\Http\Resources\Bio\BioResource;
use App\Models\Bio;
use Illuminate\Http\Request;

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
}