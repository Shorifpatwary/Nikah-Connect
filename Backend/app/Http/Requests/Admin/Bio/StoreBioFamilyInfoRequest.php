<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioFamilyInfoRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    // Allow access if the user is authenticated
    return auth()->check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'family_members_info' => ['required', 'string', 'min:10', 'max:1000'],
      'uncles_info' => ['nullable', 'string', 'min:10', 'max:1000'],
      'descent' => ['nullable', 'string', 'min:10', 'max:1000'],
      'economic_status' => ['required', Rule::in(StatusEnum::ECONOMIC_STATUS)],
      'economic_status_details' => ['required', 'string', 'min:10', 'max:1500'],
    ];
  }

  public function messages()
  {
    return [
      'family_members_info.required' => ':attribute প্রদান করা আবশ্যক।',
      'family_members_info.min' => ':attribute কমপক্ষে ১০ অক্ষরের হতে হবে।',
      'family_members_info.max' => ':attribute সর্বাধিক ১০০০ অক্ষরের হতে পারবে।',
      'uncles_info.min' => ':attribute কমপক্ষে ১০ অক্ষরের হতে হবে।',
      'uncles_info.max' => ':attribute সর্বাধিক ১০০০ অক্ষরের হতে পারবে।',
      'descent.min' => ':attribute কমপক্ষে ১০ অক্ষরের হতে হবে।',
      'descent.max' => ':attribute সর্বাধিক ১০০০ অক্ষরের হতে পারবে।',
      'economic_status.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'economic_status.in' => 'নির্বাচিত :attribute সঠিক নয়।',
      'economic_status_details.required' => ':attribute প্রদান করা আবশ্যক।',
      'economic_status_details.min' => ':attribute কমপক্ষে ১০ অক্ষরের হতে হবে।',
      'economic_status_details.max' => ':attribute সর্বাধিক ১৫০০ অক্ষরের হতে পারবে।',
    ];
  }

  /**
   * Custom attributes for validator errors.
   *
   * @return array
   */
  public function attributes()
  {
    return [
      'family_members_info' => 'পরিবারের সদস্যদের তথ্য',
      'uncles_info' => 'চাচা-মামা সংক্রান্ত তথ্য',
      'descent' => 'বংশ সম্পর্কিত তথ্য',
      'economic_status' => 'অর্থনৈতিক অবস্থা',
      'economic_status_details' => 'অর্থনৈতিক অবস্থার বিস্তারিত তথ্য',
    ];
  }
}