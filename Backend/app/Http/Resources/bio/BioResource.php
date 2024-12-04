<?php

namespace App\Http\Resources\Bio;

use App\Http\Resources\Bio\GeneralSectionResource;
use App\Http\Resources\TagResource;
use App\Models\ProfessionSection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BioResource extends JsonResource
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
      'title' => $this->title,
      'bio_profile' => $this->bio_profile,
      'status' => $this->status,
      'created_at' => (string)  $this->created_at,
      'updated_at' => (string) $this->updated_at,

      // get the relational data
      'tags' => TagResource::collection($this->whenLoaded('tags')),
      'general_section' => new GeneralSectionResource($this->whenLoaded('generalSection')),
      'location_section' => new LocationSectionResource($this->whenLoaded('locationSection')),
      'education_section' => new EducationSectionResource($this->whenLoaded('educationSection')),
      'personal_details' => new PersonalDetailsSectionResource($this->whenLoaded('personalDetails')),
      'profession_section' => new ProfessionResource($this->whenLoaded('professionSection')),
      'expected_partner' => new ExpectedPartnerResource($this->whenLoaded('expectedPartner')),
    ];
  }
}