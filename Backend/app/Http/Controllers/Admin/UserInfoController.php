<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserInfoRequest;
use App\Http\Requests\UpdateUserInfoRequest;
use App\Http\Resources\UserInfoResource;
use App\Models\UserInfo;
use Illuminate\Http\Request;

class UserInfoController extends Controller
{
  public function index(Request $request)
  {
    $query = UserInfo::query()
      ->select([
        'id',
        'ip_address',
        'device_type',
        'device_model',
        'browser_name',
        'browser_version',
        'internet',
        'city',
      ]);


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
            // Filter on user_infos fields
            $query->where($field, $value);
          }
        }
      }
    }

    // Apply sorting
    if ($request->has('sort')) {
      $sortField = $request->input('sort', 'created_at');
      $sortDirection = $request->input('sort_direction', 'asc');
      $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';

      if (in_array($sortField, ['email', 'name'])) {
        // Sort on the related user's email or name
        $query->join('users', 'user_infos.user_id', '=', 'users.id')
          ->orderBy('users.' . $sortField, $sortDirection);
      } else {
        // Sort on user_infos fields
        $query->orderBy('user_infos.' . $sortField, $sortDirection);
      }
    }

    // Apply search
    if ($request->has('search')) {
      $search = $request->input('search');

      $query->where(function ($q) use ($search) {
        $q->whereHas('user', function ($q) use ($search) {
          $q->whereRaw("SOUNDEX(name) = SOUNDEX(?)", [$search])
            ->orWhere('name', 'LIKE', '%' . $search . '%')
            ->orWhereRaw("SOUNDEX(email) = SOUNDEX(?)", [$search])
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        })
          ->orWhereRaw("SOUNDEX(device_type) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(device_os) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(browser_name) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(ip_address) = SOUNDEX(?)", [$search])
          ->orWhere('internet', 'LIKE', '%' . $search . '%')
          ->orWhereRaw("SOUNDEX(country) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(city) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(user_agent) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(registration_source) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(device_model) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(screen_resolution) = SOUNDEX(?)", [$search])
          ->orWhereRaw("SOUNDEX(internet) = SOUNDEX(?)", [$search])
          ->orWhere('internet', 'LIKE', '%' . $search . '%')
          ->orWhereRaw("SOUNDEX(region) = SOUNDEX(?)", [$search])
          ->orWhere('region', 'LIKE', '%' . $search . '%');
      });
    }

    // Apply pagination
    $perPage = $request->input('per_page', 20);
    $currentPage = $request->input('page', 1);

    $userInfos = $query->paginate($perPage, ['*'], 'page', $currentPage);

    return UserInfoResource::collection($userInfos);
  }

  public function store(Request $request)
  {
    $user = auth()->user();
    $ipAddress = $request->input('ip_address');

    $userInfoData = $request->all();
    $userInfoData['user_id'] = $user->id;

    $userInfo = UserInfo::firstOrCreate(
      [
        'user_id' => $user->id,
        'ip_address' => $ipAddress
      ],
      $userInfoData
    );

    return new UserInfoResource($userInfo);
  }

  public function show(UserInfo $userInfo)
  {
    return new UserInfoResource($userInfo);
  }

  public function update(UpdateUserInfoRequest $request, UserInfo $userInfo)
  {
    $userInfo->update($request->validated());
    return new UserInfoResource($userInfo);
  }

  public function destroy(UserInfo $userInfo)
  {
    $userInfo->delete();
    return response()->noContent();
  }
}
