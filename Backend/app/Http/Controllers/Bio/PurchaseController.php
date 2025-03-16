<?php

namespace App\Http\Controllers\Bio;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bio\PurchaseResource;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PurchaseController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    // Generate a unique cache key based on request parameters
    $cacheKey = 'purchases_' . md5(json_encode($request->all()));

    // Set cache expiration time (e.g., 1 day)
    $cacheExpiration = now()->addDay();

    // Check if data is already cached
    $purchases = Cache::remember($cacheKey, $cacheExpiration, function () use ($request) {
      $query = Purchase::with(['user', 'bio']);

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
          $query->join('users', 'purchases.user_id', '=', 'users.id')
            ->orderBy('users.' . $sortField, $sortDirection);
        } elseif (in_array($sortField, $bioSortFields)) {
          // Join with bios table for sorting by title or bio_profile
          $query->join('bios', 'purchases.bio_id', '=', 'bios.id')
            ->orderBy('bios.' . $sortField, $sortDirection);
        } else {
          // Default sorting on purchases table fields
          $query->orderBy('purchases.' . $sortField, $sortDirection);
        }
      }

      // Apply search filter
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

      return $query->paginate($perPage, ['purchases.*'], 'page', $currentPage);
    });

    return PurchaseResource::collection($purchases);
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
  public function show(Purchase $purchase)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Purchase $purchase)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Purchase $purchase)
  {
    //
  }

  /**
   * Get authenticated user's purchase records from storage.
   */
  public function userRecords(Request $request)
  {
    // Get the authenticated user ID
    $userId = auth()->id();

    if (!$userId) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Generate a unique cache key based on request parameters and user ID
    $cacheKey = 'user_purchases_' . $userId . '_' . md5(json_encode($request->all()));

    // Set cache expiration time (e.g., 1 day)
    $cacheExpiration = now()->addDay();

    // Check if data is already cached
    $purchases = Cache::remember($cacheKey, $cacheExpiration, function () use ($request, $userId) {
      $query = Purchase::with('bio')->where('purchases.user_id', $userId); // ✅ Explicitly specify table

      // Apply sorting
      if ($request->has('sort')) {
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('sort_direction', 'asc');

        // Ensure sort direction is either 'asc' or 'desc'
        $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';

        $bioSortFields = ['title', 'bio_profile', 'updated_at'];

        if (in_array($sortField, $bioSortFields)) {
          // Join with bios table for sorting by title or bio_profile
          $query->join('bios', 'purchases.bio_id', '=', 'bios.id')
            ->orderBy('bios.' . $sortField, $sortDirection);
        } else {
          // Default sorting on purchases table fields
          $query->orderBy('purchases.' . $sortField, $sortDirection);
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

      return $query->paginate($perPage, ['purchases.*'], 'page', $currentPage);
    });

    return PurchaseResource::collection($purchases);
  }
}
