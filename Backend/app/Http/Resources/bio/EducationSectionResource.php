<?php

namespace App\Http\Resources\Bio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationSectionResource extends JsonResource
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
      'education_medium' => $this->education_medium,
      'highest_qualification' => $this->highest_qualification,
      'current_study' => $this->current_study,
      'previous_exams' => $this->previous_exams,
      'other_qualifications' => $this->other_qualifications,

      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}