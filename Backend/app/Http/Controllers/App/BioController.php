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
        'generalSection' => ['gender', 'marital_status', 'birth_date', 'height', 'weight', 'complexion', "blood_group", "location_id"],
        'expectedPartner' => ['bio_profile_types'],
      ];

      // Exclude non-filterable parameters
      $excludedParams = ['sort', 'sort_direction', 'page', 'per_page'];

      // Check if 'location_id' is present and handle it separately
      if ($request->has('location_id') && !empty($request->input('location_id'))) {
        $locationIds = $request->input('location_id');

        // Process location IDs
        $locationIdsArray = explode(',', $locationIds);

        // Sort the array to normalize the order
        sort($locationIdsArray);

        // Generate a unique cache key based on the input location IDs
        $cacheKey = 'nested_location_ids_' . md5(json_encode($locationIdsArray));

        // Cache the result of getHierarchicalLocationIds
        // Cache the result permanently
        $nestedLocationIds = Cache::rememberForever($cacheKey, function () use ($locationIdsArray) {
          $locationController = new LocationController();
          return $locationController->getHierarchicalLocationIds($locationIdsArray);
        });

        // Merge original and nested location IDs
        $locationIdsArray = array_merge($locationIdsArray, $nestedLocationIds);
        $locationIdsArray = array_unique($locationIdsArray);

        $locationIdsString = implode(',', $locationIdsArray);

        // Merge the modified location_id into the request for further filtering
        $request->merge(['location_id' => $locationIdsString]);
      }

      // Apply filters
      foreach ($request->all() as $field => $value) {
        if (!in_array($field, $excludedParams) && !is_null($value)) {
          $filtered = false;

          foreach ($relationFilters as $relation => $fields) {
            if (in_array($field, $fields)) {
              $filtered = true;

              if (in_array($field, ['birth_date', 'height', 'weight'])) {
                $values = explode(',', $value);
                if (count($values) === 2) {
                  $query->whereHas($relation, function ($q) use ($field, $values) {
                    $q->whereBetween($field, [(float)$values[0], (float)$values[1]]);
                  });
                }
              } else {
                $values = explode(',', $value);
                $query->whereHas($relation, function ($q) use ($field, $values) {
                  $q->whereIn($field, $values);
                });
              }
              break;
            }
          }

          if (!$filtered) {
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


  // GET /api/bios?gender=male,female&complexion=fair,dusky&weight=50,80&sort=updated_at&sort_direction=desc&page=1&per_page=10


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