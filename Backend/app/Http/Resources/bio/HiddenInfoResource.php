<?php

namespace App\Http\Resources\Bio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HiddenInfoResource extends JsonResource
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
      'location' => $this->location,
      'family_members_name' => $this->family_members_name,
      'current_parent' => $this->current_parent,
      'parent_mobile' => $this->parent_mobile,
      'permanent_address_map_location' => $this->permanent_address_map_location,
      'present_address_map_location' => $this->present_address_map_location,
      'email' => $this->email,
      'social_links' => $this->social_links,

      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}