<?php

namespace App\Http\Resources\Bio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FamilyInfoResource extends JsonResource
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
      'family_members_info'
      => $this->family_members_info,
      'uncles_info' => $this->uncles_info,
      'descent' => $this->descent,
      'economic_status'   => $this->economic_status,
      'economic_status_details'   => $this->economic_status_details,

      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}