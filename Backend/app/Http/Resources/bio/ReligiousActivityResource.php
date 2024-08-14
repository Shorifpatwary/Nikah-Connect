<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReligiousActivityResource extends JsonResource
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
      'prayer_habits' => $this->prayer_habits,
      'haram_relationships' => $this->haram_relationships,
      'quran_recitation' => $this->quran_recitation,
      'mahram_adherence' => $this->mahram_adherence,
      'has_beard' => $this->has_beard,
      'entertainment_habits' => $this->entertainment_habits,
      'mazhab' => $this->mazhab,
      'religious_beliefs' => $this->religious_beliefs,
      'religious_knowledge' => $this->religious_knowledge,
      'family_religious_environment' => $this->family_religious_environment,
      'created_at' => (string) $this->created_at,
      'updated_at' => (string)  $this->updated_at,
    ];
  }
}