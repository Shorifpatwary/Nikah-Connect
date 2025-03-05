<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Resources\CoinResource;
use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CoinController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    // Generate a unique cache key based on request parameters
    $cacheKey = 'coins_' . md5(json_encode($request->all()));

    // Set cache expiration time (e.g., 1 day)
    $cacheExpiration = now()->addDay();

    // Check if data is already cached
    $coins = Cache::remember($cacheKey, $cacheExpiration, function () use ($request) {
      $query = Coin::with('user');

      // Apply filters
      if ($request->has('filter')) {
        foreach ($request->input('filter') as $field => $value) {
          if ($value !== null) {
            if (in_array($field, ['email'])) {
              // Filter on the related user's email
              $query->whereHas('user', function ($q) use ($field, $value) {
                $q->where($field, $value);
              });
            } else {
              $query->where($field, $value);
            }
          }
        }
      }

      // Apply sorting
      if ($request->has('sort')) {
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('sort_direction', 'asc');

        // Ensure sort direction is either 'asc' or 'desc'
        $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';

        $userSortFields = ['email', 'name'];

        if (in_array($sortField, $userSortFields)) {
          // Join with users table for sorting by email or name
          $query->join('users', 'coins.user_id', '=', 'users.id')
            ->orderBy('users.' . $sortField, $sortDirection);
        } else {
          // Default sorting on coins table fields
          $query->orderBy('coins.' . $sortField, $sortDirection);
        }
      }

      // Apply search
      if ($request->has('search')) {
        $search = $request->input('search');
        $query->whereHas('user', function ($q) use ($search) {
          $q->whereRaw('SOUNDEX(name) = SOUNDEX(?)', [$search])
            ->orWhere('name', 'LIKE', '%' . $search . '%')
            ->orWhereRaw('SOUNDEX(email) = SOUNDEX(?)', [$search])
            ->orWhere('email', 'LIKE', '%' . $search . '%')
            ->orWhere('phone', 'LIKE', '%' . $search . '%');
        });
      }

      // Apply pagination
      $perPage = $request->input('per_page', 20);
      $currentPage = $request->input('page', 1);

      return $query->paginate($perPage, ['*'], 'page', $currentPage);
    });

    return CoinResource::collection($coins);
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
  public function show(Coin $coin)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Coin $coin)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Coin $coin)
  {
    //
  }
}