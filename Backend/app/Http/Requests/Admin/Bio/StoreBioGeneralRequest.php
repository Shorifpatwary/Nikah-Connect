<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioGeneralRequest extends FormRequest
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
   */ public function rules(): array
  {
    return [
      'gender' => ['required', Rule::in(StatusEnum::GENDERS)],
      'marital_status' => ['required', Rule::in(StatusEnum::MARITAL_STATUS)],
      'birth_date' => ['required', 'date', 'before_or_equal:2020-01-01', 'after_or_equal:1950-01-01'],

      // Validate as numeric but accept string input
      'height' => ['required', 'regex:/^[0-9]+(\.[0-9]{1,2})?$/', 'numeric', 'between:3,8'],
      'weight' => ['required', 'regex:/^[0-9]+(\.[0-9]{1,2})?$/', 'numeric', 'between:20,150'],

      'complexion' => ['required', Rule::in(StatusEnum::COMPLEXIONS)],
      'blood_group' => ['required', Rule::in(StatusEnum::BLOOD_GROUPS)],

      'language_skills' => ['nullable', 'string', 'between:5,100'],
      'location_id' => ['required',  'exists:locations,id'],
    ];
  }
  public function messages(): array
  {
    return [
      'gender.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'gender.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'marital_status.required' => ':attribute নির্বাচন করা আবশ্যক ।',
      'marital_status.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'birth_date.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'birth_date.date' => ':attribute ফরম্যাট সঠিক নয়।',
      'birth_date.before_or_equal' => ':attribute ২০২০-১২-৩১ এর আগে বা সমান হতে হবে।',
      'birth_date.after_or_equal' => ':attribute ১৯৫০-০১-০১ এর পরে বা সমান হতে হবে।',

      'height.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'height.regex' => ':attribute একটি সঠিক সংখ্যা হতে হবে।', // Changed from integer to regex validation
      'height.numeric' => ':attribute একটি সংখ্যা হতে হবে।',
      'height.between' => ':attribute ৩ থেকে ৮ ফিট এর মধ্যে হতে হবে।',

      'weight.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'weight.regex' => ':attribute একটি সঠিক সংখ্যা হতে হবে।', // Changed from integer to regex validation
      'weight.numeric' => ':attribute একটি সংখ্যা হতে হবে।',
      'weight.between' => ':attribute ২০ থেকে ১৫০ কেজি এর মধ্যে হতে হবে।',

      'complexion.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'complexion.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'blood_group.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'blood_group.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'language_skills.between' => ':attribute ৫ থেকে ১০০ অক্ষরের এর মধ্যে হতে হবে।',

      'location_id.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'location_id.exists' => 'নির্বাচিত :attribute বিদ্যমান নেই।',
    ];
  }

  public function attributes(): array
  {
    return [
      'gender' => 'বায়োডাটার ধরন',
      'marital_status' => 'বৈবাহিক অবস্থা',
      'birth_date' => 'জন্ম তারিখ',
      'height' => 'উচ্চতা',
      'weight' => 'ওজন',
      'complexion' => 'গাত্রবর্ণ',
      'blood_group' => 'রক্তের গ্রুপ',
      'language_skills' => 'ভাষার দক্ষতা',
      'location_id' => 'ঠিকানা',
    ];
  }
}