<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MarriageInfoResource extends JsonResource
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
      'prev_marriage' => $this->prev_marriage,
      'work_after' => $this->work_after,
      'study_after' => $this->study_after,
      'ceremony_plans' => $this->ceremony_plans,
      'partner_view_rules' => $this->partner_view_rules,
      'marriage_weakness' => $this->marriage_weakness,
      'family_pref' => $this->family_pref,
      'dowry_amount' => $this->dowry_amount,
      'dowry_opinion' => $this->dowry_opinion,
      'compromise_factors' => $this->compromise_factors,
      'cash_gift_opinion' => $this->cash_gift_opinion,

      'bio_id' => $this->bio_id,

      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}