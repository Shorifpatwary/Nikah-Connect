<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
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
      ->with([
        'generalSection:id,bio_id,gender,birth_date,height,weight,complexion',
        'professionSection:id,bio_id,profession',
        'expectedPartner:id,bio_id,bio_profile_types',
        // 'locationSection:id,bio_id,permanent_address,present_address,relocate_plan',
        // 'educationSection:id,bio_id,highest_qualification,previous_exams',
      ])
      ->select(['bios.id', 'bios.title', 'bios.bio_profile', 'bios.status', 'bios.updated_at'])
      ->where('status', 'approved'); // Filter only approved bios;

    // Map of relations and their fields
    $relationFilters = [
      'generalSection' => ['gender', 'birth_date', 'height', 'weight', 'location_id', 'complexion'],
      'educationSection' => ['highest_qualification', 'previous_exams'],
      // Add more relations as needed
    ];

    // Apply filters
    if ($request->has('filter')) {
      foreach ($request->input('filter') as $field => $value) {
        if (!is_null($value)) {
          // Check which relation the field belongs to
          $filtered = false;
          foreach ($relationFilters as $relation => $fields) {
            if (in_array($field, $fields)) {
              $filtered = true;

              // Range-based filtering (min and max) for specific fields like birth_date, height, weight
              if (in_array($field, ['birth_date', 'height', 'weight'])) {
                if (isset($value['min']) && isset($value['max'])) {
                  $query->whereHas($relation, function ($q) use ($field, $value) {
                    $q->whereBetween($field, [$value['min'], $value['max']]);
                  });
                }
              } else {
                // Handle single or multiple values
                $values = explode(',', $value); // Handle multiple values separated by commas
                $query->whereHas($relation, function ($q) use ($field, $values) {
                  $q->whereIn($field, $values);
                });
              }
              break;
            }
          }

          // If no relation was found, apply filter directly to Bio model
          if (!$filtered) {
            $query->where($field, $value);
          }
        }
      }
    }

    // Apply sorting
    if ($request->has('sort')) {
      $sortField = $request->input('sort', 'created_at');
      $sortDirection = strtolower($request->input('sort_direction', 'asc')) === 'desc' ? 'desc' : 'asc';

      $query->orderBy('bios.' . $sortField, $sortDirection);
    }

    // Apply pagination
    $perPage = $request->input('per_page', 12);
    $currentPage = $request->input('page', 1);

    $bios = $query->paginate($perPage, ['*'], 'page', $currentPage);

    // Return the collection of bios as a paginated resource
    return BioResource::collection($bios);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
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
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}