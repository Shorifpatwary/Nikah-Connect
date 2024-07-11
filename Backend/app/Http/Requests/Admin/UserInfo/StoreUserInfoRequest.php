<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'device_type' => 'nullable|string|max:255',
            'device_os' => 'nullable|string|max:255',
            'browser_name' => 'nullable|string|max:255',
            'browser_version' => 'nullable|string|max:255',
            'ip_address' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'user_agent' => 'nullable|string',
            'registration_source' => 'nullable|string|max:255',
            'device_model' => 'nullable|string|max:255',
            'referrer_url' => 'nullable|string|max:255',
            'screen_resolution' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'user_id' => 'required|exists:users,id',
        ];
    }
}