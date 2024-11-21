<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBioGeneralRequest extends FormRequest
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
      'gender' => ['required', Rule::in(StatusEnum::GENDERS)],
      'marital_status' => [
        'required',
        Rule::in(StatusEnum::MARITAL_STATUS),
        function ($attribute, $value, $fail) {
          if ($this->input('gender') === 'পাত্রী' && $value === 'বিবাহিত') {
            $fail('পাত্রীদের জন্য বিবাহিত বৈবাহিক অবস্থা গ্রহণযোগ্য নয়।');
          }
        },
      ],
      'birth_date' => ['required', 'date', 'before_or_equal:2020-01-01', 'after_or_equal:1950-01-01'],

      'height' => ['required', 'regex:/^[0-9]+(\.[0-9]{1,2})?$/', 'numeric', 'between:3,8'],
      'weight' => ['required', 'regex:/^[0-9]+(\.[0-9]{1,2})?$/', 'numeric', 'between:20,150'],

      'complexion' => ['required', Rule::in(StatusEnum::COMPLEXIONS)],
      'blood_group' => ['required', Rule::in(StatusEnum::BLOOD_GROUPS)],

      'language_skills' => ['nullable', 'string', 'between:5,100'],
      'location_id' => ['required', 'exists:locations,id'],
    ];
  }

  /**
   * Get custom messages for validator errors.
   *
   * @return array<string, string>
   */
  public function messages(): array
  {
    return [
      'gender.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'gender.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'marital_status.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'marital_status.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'birth_date.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'birth_date.date' => ':attribute ফরম্যাট সঠিক নয়।',
      'birth_date.before_or_equal' => ':attribute ২০২০-০১-০১ অথবা এর পূর্বে হতে হবে।',
      'birth_date.after_or_equal' => ':attribute ১৯৫০-০১-০১ অথবা এর পরে হতে হবে।',

      'height.required' => ':attribute প্রদান করা আবশ্যক।',
      'height.regex' => ':attribute শুধুমাত্র সংখ্যাসূচক এবং সর্বোচ্চ দুই দশমিকের পরিমাণ হতে হবে।',
      'height.between' => ':attribute ৩ থেকে ৮ ফিটের মধ্যে হতে হবে।',

      'weight.required' => ':attribute প্রদান করা আবশ্যক।',
      'weight.regex' => ':attribute শুধুমাত্র সংখ্যাসূচক এবং সর্বোচ্চ দুই দশমিকের পরিমাণ হতে হবে।',
      'weight.between' => ':attribute ২০ থেকে ১৫০ কেজির মধ্যে হতে হবে।',

      'complexion.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'complexion.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'blood_group.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'blood_group.in' => 'ভিন্ন :attribute নির্বাচিত হয়েছে।',

      'language_skills.between' => ':attribute ৫ থেকে ১০০ অক্ষরের মধ্যে হতে হবে।',
      'location_id.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'location_id.exists' => ':attribute সঠিকভাবে প্রদান করা হয়নি।',
    ];
  }
}
