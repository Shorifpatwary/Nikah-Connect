<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
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
            'device_type' => $this->device_type,
            'device_os' => $this->device_os,
            'browser_name' => $this->browser_name,
            'browser_version' => $this->browser_version,
            'ip_address' => $this->ip_address,
            'country' => $this->country,
            'city' => $this->city,
            'user_agent' => $this->user_agent,
            'registration_source' => $this->registration_source,
            'device_model' => $this->device_model,
            'screen_resolution' => $this->screen_resolution,
            'internet' => $this->internet,
            'region' => $this->region,
            'postal' => $this->postal,
            'loc' => $this->loc,
            'timezone' => $this->timezone,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string)  $this->updated_at,

            // Include user information
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
