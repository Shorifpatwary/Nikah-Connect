<?php

namespace App\Http\Resources\Bio;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
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

      'user' => new UserResource($this->whenLoaded('user')),
      'bio' => new BioResource($this->whenLoaded('bio')),

      'created_at' => (string)  $this->created_at,
      'updated_at' => (string) $this->updated_at,
    ];
  }
}