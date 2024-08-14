<?php

namespace App\Http\Resources\Bio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationSectionResource extends JsonResource
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
            'permanent_address' => $this->permanent_address,
            'present_address' => $this->present_address,
            'relocate_plan' => $this->relocate_plan,
            'childhood_address' => $this->childhood_address,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string)  $this->updated_at,
        ];
    }
}