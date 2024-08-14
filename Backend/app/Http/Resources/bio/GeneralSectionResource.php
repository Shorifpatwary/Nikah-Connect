<?php

namespace App\Http\Resources\Bio;

use App\Http\Resources\LocationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GeneralSectionResource extends JsonResource
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
      'gender' => $this->gender,
      'marital_status' => $this->marital_status,
      'birth_date' => $this->birth_date,
      'height' => $this->height,
      'weight' => $this->weight,
      'complexion' => $this->complexion,
      'blood_group' => $this->blood_group,
      'language_skills' => $this->language_skills,
      'location' => new LocationResource($this->whenLoaded('location')),
      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}