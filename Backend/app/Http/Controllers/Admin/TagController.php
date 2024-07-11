<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\StoreTagRequest;
use App\Http\Requests\Admin\Tag\UpdateTagRequest;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Tag::query();

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
                $q->whereRaw('SOUNDEX(name) = SOUNDEX(?)', [$search])
                    ->orWhereRaw('SOUNDEX(search_text) = SOUNDEX(?)', [$search]);
            });
        }

        // Apply pagination
        $perPage = $request->input('per_page', 20);
        $currentPage = $request->input('page', 1);

        $tags = $query->paginate($perPage, ['*'], 'page', $currentPage);

        // Return the collection of tags as a paginated resource
        return TagResource::collection($tags);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $tag = Tag::create($request->validated());
        return new TagResource($tag);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        return new TagResource($tag);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $tag->update($request->validated());
        return new TagResource($tag);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->json([
            'message' => 'Tag deleted successfully.'
        ]);
    }
}