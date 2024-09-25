<?php

namespace App\Http\Resources\Bio;

use App\Http\Resources\Bio\BioResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilledMarksResource extends JsonResource
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
      'general_filled_marks' => $this->general_filled_marks,
      'location_filled_marks' => $this->location_filled_marks,
      'education_filled_marks' => $this->education_filled_marks,
      'personal_info_filled_marks' => $this->personal_info_filled_marks,
      'family_filled_marks' => $this->family_filled_marks,
      'profession_filled_marks' => $this->profession_filled_marks,
      'religious_activity_filled_marks' => $this->religious_activity_filled_marks,
      'marital_info_filled_marks' => $this->marital_info_filled_marks,
      'expected_partner_filled_marks' => $this->expected_partner_filled_marks,
      'hidden_info_filled_marks' => $this->hidden_info_filled_marks,

      'bio' =>
      new BioResource($this->whenLoaded('bio')),

      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}