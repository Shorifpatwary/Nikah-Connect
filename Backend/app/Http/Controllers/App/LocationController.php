<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  // public function index()
  // {

  //     $locations = Cache::remember('locations', now()->addMinute(), function () {
  //         return Location::all();
  //         // return DB::table('locations')->get();
  //     });
  //     // $locations = Cache::remember('locationsa', now()->addSecond(), function () {
  //     //     return Location::all();
  //     // });
  //     // $locations =  Location::all();
  //     // return response without collection
  //     return response()->json($locations);
  // }

  public function index()
  {
    $nestedLocations = Cache::remember('nested_locations', now()->addDays(10), function () {
      return $this->getNestedLocations();
    });

    return response()->json($nestedLocations);
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

  private function getNestedLocations($parentId = null)
  {
    $locations = Location::where('parent_id', $parentId)->get();

    $nestedLocations = [];
    foreach ($locations as $location) {
      $nestedLocation = [
        'id' => $location->id,
        'name' => $location->name,
        'type' => $location->type,
        'parent_id' => $location->parent_id,
        'children' => $this->getNestedLocations($location->id) // Recursive call
      ];
      $nestedLocations[] = $nestedLocation;
    }

    return $nestedLocations;
  }

  public function getHierarchicalLocationIds($parentIds = [])
  {
    // If input is a single value, convert it to an array
    if (!is_array($parentIds)) {
      $parentIds = [$parentIds];
    }

    // Retrieve all locations based on the parent IDs
    $locations = Location::whereIn('parent_id', $parentIds)->get();

    // Initialize an array to store location IDs
    $locationIds = [];

    // Iterate through the locations and collect their IDs
    foreach ($locations as $location) {
      // Add the current location's ID to the array
      $locationIds[] = $location->id;

      // Recursively get nested locations and merge them into the main array
      $locationIds = array_merge($locationIds, $this->getHierarchicalLocationIds($location->id));
    }

    return $locationIds;
  }
}