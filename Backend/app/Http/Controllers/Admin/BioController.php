<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Bio\StoreBioRequest;
use App\Http\Requests\Admin\Bio\UpdateBioRequest;
use App\Http\Resources\BioResource;
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
            ->with(['tags:id,name'])
            ->select(['id', 'title', 'status', 'updated_at']);

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
            $query->orderBy($sortField, $sortDirection);
        }

        // Apply search
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('tags', function ($query) use ($search) {
                        $query->whereRaw('SOUNDEX(name) = SOUNDEX(?)', [$search])
                            ->orWhere('search_text', 'LIKE', '%' . $search . '%');
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
