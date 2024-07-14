<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'search_text' => $this->search_text,
            'group_name' => $this->group_name,
            'status' => $this->status,
            'created_at' => (string)  $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}