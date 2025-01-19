<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bio\BioResource;
use App\Models\Bio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class BioController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    // Generate a unique cache key based on request parameters
    $cacheKey = 'bios_' . md5(json_encode($request->all()));

    // Set cache expiration time (e.g., 1 day)
    $cacheExpiration = now()->addDay();

    // Check if data is already cached
    $bios = Cache::remember($cacheKey, $cacheExpiration, function () use ($request) {
      $query = Bio::query()
        ->with([
          'generalSection:id,bio_id,gender,birth_date,height,weight,complexion',
          'professionSection:id,bio_id,profession',
          'expectedPartner:id,bio_id,bio_profile_types',
          // Add more relations as needed
        ])
        ->select(['bios.id', 'bios.title', 'bios.bio_profile', 'bios.status', 'bios.updated_at'])
        ->where('status', 'approved'); // Filter only approved bios

      // Map of relations and their fields
      $relationFilters = [
        'generalSection' => ['gender', 'marital_status', 'birth_date', 'height', 'weight', 'complexion', 'blood_group', 'location_id'],
        'educationSection' => ['education_medium'],
        'familyInfoSection' => ['economic_status'],
        'professionSection' => ['profession'],
        'religiousActivity' => ['mazhab'],
        'expectedPartner' => ['expected_complexion', 'expected_marital_status', 'expected_bio_profile_types'],
      ];

      // Exclude non-filterable parameters
      $excludedParams = ['sort', 'sort_direction', 'page', 'per_page'];

      // Handle location_id filtering separately
      if ($request->has('location_id') && !empty($request->input('location_id'))) {
        $locationIds = $request->input('location_id');
        $locationIdsArray = explode(',', $locationIds);

        // Sort the array to normalize the order
        sort($locationIdsArray);

        // Generate a unique cache key for hierarchical IDs
        $cacheKey = 'nested_location_ids_' . md5(json_encode($locationIdsArray));

        // Cache the hierarchical location IDs
        $nestedLocationIds = Cache::rememberForever($cacheKey, function () use ($locationIdsArray) {
          $locationController = new LocationController();
          return $locationController->getHierarchicalLocationIds($locationIdsArray);
        });

        // Merge and de-duplicate location IDs
        $locationIdsArray = array_merge($locationIdsArray, $nestedLocationIds);
        $locationIdsArray = array_unique($locationIdsArray);

        // Update the request with modified location IDs
        $locationIdsString = implode(',', $locationIdsArray);
        $request->merge(['location_id' => $locationIdsString]);
      }

      // Apply filters
      foreach ($request->all() as $field => $value) {
        if (!in_array($field, $excludedParams) && !is_null($value)) {
          $filtered = false;

          foreach ($relationFilters as $relation => $fields) {
            if (in_array($field, $fields)) {
              $filtered = true;
              $column = $field;

              // Adjust column name for `expectedPartner` relation
              if ($relation === 'expectedPartner') {
                $column = str_replace('expected_', '', $field);
              }

              if (in_array($field, ['birth_date', 'height', 'weight'])) {
                $values = explode(',', $value);
                if (count($values) === 2) {
                  $query->whereHas($relation, function ($q) use ($column, $values) {
                    $q->whereBetween($column, [(float)$values[0], (float)$values[1]]);
                  });
                }
              } else {
                $values = explode(',', $value);
                $query->whereHas($relation, function ($q) use ($column, $values) {
                  $q->whereIn($column, $values);
                });
              }
              break;
            }
          }
          // Direct filtering for the 'bio_profile' column
          if (!$filtered && $field === 'bio_profile') {
            $values = explode(',', $value);
            $query->whereIn('bios.bio_profile', $values);
          } elseif (!$filtered) {
            $query->where($field, $value);
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

      return $query->paginate($perPage, ['*'], 'page', $currentPage);
    });

    // Return the cached or newly fetched data as a paginated resource
    return BioResource::collection($bios);
  }

  // GET /api/bios?gender=male,female&complexion=fair,dusky&weight=50,80&height=150,180&birth_date=1980-01-01,2000-12-31&location_id=1,2,3&expected_partner_marital_status=single,divorced&expected_partner_complexion=fair,medium&sort=updated_at&sort_direction=desc&page=1&per_page=10

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
    // Retrieve the bio using the provided ID
    $bio = Bio::with(['generalSection', 'locationSection', 'educationSection', 'personalDetails', 'familyInfoSection', 'professionSection', 'religiousActivity', 'expectedPartner', 'marriageInfo'])
      ->find($id);

    // Check if the bio exists
    if (!$bio) {
      return response()->json(['error' => 'Bio not found'], 404);
    }

    // Return the bio data as a resource
    return new BioResource($bio);
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