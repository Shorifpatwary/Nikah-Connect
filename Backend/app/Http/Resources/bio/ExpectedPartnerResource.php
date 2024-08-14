<?php

namespace App\Http\Resources\Bio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpectedPartnerResource extends JsonResource
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
      'age' => $this->age,
      'complexion' => $this->complexion,
      'height' => $this->height,
      'marital_status' => $this->marital_status,
      'educational_qualification' => $this->educational_qualification,
      'profession' => $this->profession,
      'economic_status' => $this->economic_status,
      'family' => $this->family,
      'about_partner' => $this->family,

      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}