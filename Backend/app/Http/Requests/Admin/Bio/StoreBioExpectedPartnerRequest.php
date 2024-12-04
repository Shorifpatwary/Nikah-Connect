<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use App\Models\GeneralSection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioExpectedPartnerRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
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
      'age' => 'required|string|min:2|max:250',
      'complexion' => [
        'required',
        'array',
      ],
      'complexion.*' => [
        "string",
        Rule::in(StatusEnum::COMPLEXIONS), // Each item must match the allowed values
      ],

      'height' => 'required|string|min:10|max:250',
      'marital_status' => [
        'required',
        'array',
      ],
      'marital_status.*' => [
        'string',
        Rule::in(StatusEnum::MARITAL_STATUS),
      ],

      'educational_qualification' => 'required|string|min:10|max:1000',
      'profession' => 'required|string|min:3|max:1000',
      'economic_status'
      => 'required|string|min:4|max:200',
      'bio_profile_types' => [
        'required',
        'array',
        'max:3',
      ],
      'bio_profile_types.*' => [
        'string',
        Rule::in(StatusEnum::BIO_PROFILE_TYPES),
      ],
      'family' => 'nullable|string|max:1000',
      'about_partner' => 'nullable|string|max:2500',
    ];
  }

  /**
   * Custom validation messages.
   *
   * @return array<string, string>
   */
  public function messages(): array
  {
    return [
      'age.required' => ':attribute প্রদান করা আবশ্যক।',
      'age.string' => ':attribute একটি টেক্সট হতে হবে।',
      'age.min' => ':attribute অন্তত ২ অক্ষর হতে হবে।',
      'age.max' => ':attribute সর্বাধিক ১০০ অক্ষর হতে পারবে।',

      'complexion.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'complexion.array' => ':attribute এর মান একটি বৈধ তালিকা হতে হবে।',
      // 'complexion.min' => ':attribute এ কমপক্ষে ২ টি আইটেম নির্বাচন করতে হবে।',
      'complexion.*.in' => 'নির্বাচিত :attribute এর অন্তর্গত মান সঠিক নয়।',
      'complexion.*.string' => ':attribute এর প্রতিটি মান টেক্সট আকারে থাকা আবশ্যক।',

      'height.required' => ':attribute প্রদান করা আবশ্যক।',
      'height.string' => ':attribute একটি বৈধ টেক্সট হতে হবে।',
      'height.min' => ':attribute কমপক্ষে :min অক্ষর হতে হবে।',
      'height.max' => ':attribute সর্বাধিক :max অক্ষর পর্যন্ত হতে পারে।',

      'marital_status.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'marital_status.array' => ':attribute এর মান একটি বৈধ তালিকা হতে হবে।',
      // 'marital_status.min' => ':attribute এ কমপক্ষে দুইটি আইটেম থাকা আবশ্যক।',
      'marital_status.*.in' => 'নির্বাচিত :attribute এর অন্তর্গত প্রতিটি মান সঠিক নয়।',
      'marital_status.*.string' => ':attribute এর প্রতিটি মান টেক্সট আকারে থাকা আবশ্যক।',

      'educational_qualification.required' => ':attribute প্রদান করা আবশ্যক।',
      'educational_qualification.string' => ':attribute একটি টেক্সট হতে হবে।',
      'educational_qualification.min' => ':attribute অন্তত ১০ অক্ষর হতে হবে।',
      'educational_qualification.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'profession.required' => ':attribute প্রদান করা আবশ্যক।',
      'profession.string' => ':attribute একটি টেক্সট হতে হবে।',
      'profession.min' => ':attribute অন্তত ৩ অক্ষর হতে হবে।',
      'profession.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'economic_status.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'economic_status.string' => ':attribute এর মান একটি বৈধ টেক্সট হতে হবে।',
      'economic_status.min' => ':attribute কমপক্ষে :min অক্ষরের হতে হবে।',
      'economic_status.max' => ':attribute সর্বোচ্চ :max অক্ষরের হতে পারে।',

      'bio_profile_types.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'bio_profile_types.array' => ':attribute এর মান একটি বৈধ তালিকা হতে হবে।',
      'bio_profile_types.max' => ':attribute এ সর্বোচ্চ তিনটি আইটেম থাকতে পারবে।',
      'bio_profile_types.*.in' => 'নির্বাচিত :attribute এর অন্তর্গত প্রতিটি মান সঠিক নয়।',
      'bio_profile_types.*.string' => ':attribute এর প্রতিটি মান টেক্সট আকারে থাকা আবশ্যক।',

      'family.string' => ':attribute একটি টেক্সট হতে হবে।',
      'family.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'about_partner.string' => ':attribute একটি টেক্সট হতে হবে।',
      'about_partner.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',
    ];
  }

  /**
   * Custom attribute names.
   *
   * @return array<string, string>
   */
  public function attributes(): array
  {
    return [
      'age' => 'বয়স',
      'complexion' => 'গাত্রবর্ণ',
      'height' => 'উচ্চতা',
      'marital_status' => 'বৈবাহিক অবস্থা',
      'educational_qualification' => 'শিক্ষাগত যোগ্যতা',
      'profession' => 'পেশা',
      'economic_status' => 'অর্থনৈতিক অবস্থা',
      'bio_profile_types' => 'প্রোফাইলের ধরন',
      'family' => 'পরিবার',
      'about_partner' => 'পছন্দের সঙ্গী সম্পর্কে',
    ];
  }
}