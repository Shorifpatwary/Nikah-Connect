<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

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

            $sortDirection = $request->input('sort_direction', 'asc');
            // If the sort direction is not 'asc', default to 'desc'
            $sortDirection = $sortDirection === 'asc' ? 'asc' : 'desc';
            $query->orderBy($sortField, $sortDirection);
        }
        // Apply search
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }


        // Apply pagination
        $perPage = $request->input('per_page', 20);
        $currentPage = $request->input('page', 1);


        $users = $query->paginate($perPage, ['*'], 'page', $currentPage);


        // return response()->json($users);
        return UserResource::collection($users);
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $roles = $user->getRoleNames();
        return response()->json($roles);
        // Load roles for a single user
        // $user->with('roles');

        // return new UserResource($user->getRoleNames());
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, User $user)
    // {
    //     $request->validate([
    //         'name' => 'required|unique:users,name,' . $user->id,
    //     ]);

    //     $user->update(['name' => $request->name]);

    //     return response()->json($user);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }

    /**
     * Update the specified user role.
     */
    public function updateUserRole(Request $request, User $user)
    {
        // Validate the request
        $request->validate([
            'roleName' => 'required|exists:roles,name',
            'userId' => 'required|exists:users,id',
        ]);

        // Retrieve the user by ID
        $user = User::findOrFail($request->input('userId'));

        // Assign the role to the user
        $roleName = $request->input('roleName');
        $user->assignRole($roleName);

        // Return a response
        return response()->json([
            'message' => "Role '{$roleName}' has been assigned to user '{$user->name}'.",
            'user' => $user->load('roles'), // Load the roles relationship
        ]);
    }
}
