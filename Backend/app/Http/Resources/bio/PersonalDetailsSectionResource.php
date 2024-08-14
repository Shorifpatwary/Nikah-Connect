<?php

namespace App\Http\Resources\Bio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonalDetailsSectionResource extends JsonResource
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
      'about_yourself' => $this->about_yourself,
      'outdoor_clothing' => $this->outdoor_clothing,
      'physical_mental_illness' => $this->physical_mental_illness,
      'favorite_books' => $this->favorite_books,
      'favorite_online_personalities' => $this->favorite_online_personalities,
      'device_usage_time' => $this->device_usage_time,
      'affiliations' => $this->affiliations,

      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}