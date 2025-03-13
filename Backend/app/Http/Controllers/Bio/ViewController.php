<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bio\ViewResource;
use App\Http\Resources\CoinResource;
use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ViewController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    // Generate a unique cache key based on request parameters
    $cacheKey = 'views_' . md5(json_encode($request->all()));

    // Set cache expiration time (e.g., 1 day)
    $cacheExpiration = now()->addDay();

    // Check if data is already cached
    $views = Cache::remember($cacheKey, $cacheExpiration, function () use ($request) {
      $query = View::with(['user', 'bio']);


      // Apply sorting
      if ($request->has('sort')) {
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('sort_direction', 'asc');

        // Ensure sort direction is either 'asc' or 'desc'
        $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';

        $userSortFields = ['email', 'name'];
        $bioSortFields = ['title', 'bio_profile'];

        if (in_array($sortField, $userSortFields)) {
          // Join with users table for sorting by email or name
          $query->join('users', 'views.user_id', '=', 'users.id')
            ->orderBy('users.' . $sortField, $sortDirection);
        } elseif (in_array($sortField, $bioSortFields)) {
          // Join with bios table for sorting by gender, height, etc.
          $query->join('bios', 'views.bio_id', '=', 'bios.id')
            ->orderBy('bios.' . $sortField, $sortDirection);
        } else {
          // Default sorting on views table fields
          $query->orderBy('views.' . $sortField, $sortDirection);
        }
      }

      if ($request->has('search')) {
        $search = $request->input('search');

        $query->where(function ($q) use ($search) {
          // Search in users table
          $q->whereHas('user', function ($subQuery) use ($search) {
            $subQuery->whereRaw('SOUNDEX(name) = SOUNDEX(?)', [$search])
              ->orWhere('name', 'LIKE', '%' . $search . '%')
              ->orWhereRaw('SOUNDEX(email) = SOUNDEX(?)', [$search])
              ->orWhere('email', 'LIKE', '%' . $search . '%')
              ->orWhere('phone', 'LIKE', '%' . $search . '%');
          });

          // Search in bios table (title column)
          $q->orWhereHas('bio', function ($subQuery) use ($search) {
            $subQuery->where('title', 'LIKE', '%' . $search . '%');
          });
        });
      }

      // Apply pagination
      $perPage = $request->input('per_page', 20);
      $currentPage = $request->input('page', 1);

      return $query->paginate($perPage, ['views.*'], 'page', $currentPage);
    });

    return ViewResource::collection($views);
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
  public function show(View $view)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, View $view)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(View $view)
  {
    //
  }

  /**
   * Get authenticated user resource from storage.
   */
  public function userRecords(Request $request)
  {
    // Get the authenticated user ID
    $userId = auth()->id();

    if (!$userId) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Generate a unique cache key based on request parameters and user ID
    $cacheKey = 'user_records_' . $userId . '_' . md5(json_encode($request->all()));

    // Set cache expiration time (e.g., 1 day)
    $cacheExpiration = now()->addDay();

    // Check if data is already cached
    $records = Cache::remember($cacheKey, $cacheExpiration, function () use ($request, $userId) {
      $query = View::with('bio')->where('user_id', $userId);

      // Apply sorting
      if ($request->has('sort')) {
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('sort_direction', 'asc');

        // Ensure sort direction is either 'asc' or 'desc'
        $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';

        $bioSortFields = ['title', 'bio_profile', 'updated_at'];

        if (in_array($sortField, $bioSortFields)) {
          // Join with bios table for sorting by title or bio_profile
          $query->join('bios', 'views.bio_id', '=', 'bios.id')
            ->orderBy('bios.' . $sortField, $sortDirection);
        } else {
          // Default sorting on views table fields
          $query->orderBy('views.' . $sortField, $sortDirection);
        }
      }

      // Apply search filter
      if ($request->has('search')) {
        $search = $request->input('search');

        $query->whereHas('bio', function ($subQuery) use ($search) {
          $subQuery->where('title', 'LIKE', '%' . $search . '%');
        });
      }

      // Apply pagination
      $perPage = $request->input('per_page', 40);
      $currentPage = $request->input('page', 1);

      return $query->paginate($perPage, ['views.*'], 'page', $currentPage);
    });

    return ViewResource::collection($records);
  }
}