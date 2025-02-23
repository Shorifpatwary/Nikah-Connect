<?php

namespace App\Http\Requests\Admin\Bio;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\StatusEnum;
use Illuminate\Validation\Rule;

class StoreShortBio extends FormRequest
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
    // Get marital_status from the request input
    $maritalStatus = $this->input('marital_status', null);

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

      // Validate as numeric but accept string input
      'height' => ['required', 'regex:/^[0-9]+(\.[0-9]{1,2})?$/', 'numeric', 'between:3,8'],
      'weight' => ['required', 'regex:/^[0-9]+(\.[0-9]{1,2})?$/', 'numeric', 'between:20,150'],

      'complexion' => ['required', Rule::in(StatusEnum::COMPLEXIONS)],
      'blood_group' => ['required', Rule::in(StatusEnum::BLOOD_GROUPS)],

      'location_id' => ['required',  'exists:locations,id'],

      'permanent_address' => ['required', 'string', 'max:1000'],

      'education_medium' => [
        'required',
        Rule::in(array_values(StatusEnum::EDUCATION_MEDIUM)),
      ],

      'previous_exams' => 'required|string|min:50|max:2500',

      'family_members_info' => ['required', 'string', 'min:10', 'max:1000'],
      'economic_status' => ['required', Rule::in(StatusEnum::ECONOMIC_STATUS)],

      'profession' => [
        'required',
        Rule::in(StatusEnum::PROFESSION_STATUS)
      ],
      'profession_description' => 'required|string|min:10|max:2500',
      'mazhab' => [
        'required',
        Rule::in(StatusEnum::ALL_MAZHAB),
      ],
      'prev_marriage' =>
      [
        'nullable',
        'string',
        'min:10',
        'max:1000',
        // Apply the required rule if marital_status is not 'অবিবাহিত'.
        Rule::requiredIf($maritalStatus !== 'অবিবাহিত'),
      ],
      // hidden info 
      'name' => 'required|string|min:2|max:255',
      'email' => 'required|email|min:5|max:255',
      'location' => 'required|string|min:5|max:1000',
      'family_members_name' => 'required|string|min:5|max:1000',
      'current_parent' => 'required|string|min:2|max:255',
      'parent_mobile' => 'required|string|min:10|max:25',
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

      'permanent_address.required' => ':attribute আবশ্যক।',
      'permanent_address.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'education_medium.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'education_medium.in' => ':attribute এর মান সঠিক নয়।',

      'previous_exams.required' => ':attribute আবশ্যক।',
      'previous_exams.string' => ':attribute একটি টেক্সট হতে হবে।',
      'previous_exams.min' => ':attribute সর্বনিম্ন ৫০ অক্ষর হতে হবে।',
      'previous_exams.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',

      'family_members_info.required' => ':attribute প্রদান করা আবশ্যক।',
      'family_members_info.min' => ':attribute কমপক্ষে ১০ অক্ষরের হতে হবে।',
      'family_members_info.max' => ':attribute সর্বাধিক ১০০০ অক্ষরের হতে পারবে।',

      'economic_status.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'economic_status.in' => 'নির্বাচিত :attribute সঠিক নয়।',

      'profession.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'profession.in' => 'নির্বাচিত :attribute টি সঠিক নয়।',

      'profession_description.required' => ':attribute আবশ্যক।',
      'profession_description.string' => ':attribute একটি টেক্সট হতে হবে।',
      'profession_description.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'profession_description.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',

      'mazhab.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'mazhab.in' => 'নির্বাচিত :attribute টি সঠিক নয়।',

      'prev_marriage.required' =>  ':attribute আবশ্যক।',
      'prev_marriage.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'prev_marriage.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'name.required' => ':attribute আবশ্যক।',
      'name.string' => ':attribute একটি টেক্সট হতে হবে।',
      'name.min' => ':attribute সর্বনিম্ন ২ অক্ষর হতে হবে।',
      'name.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',

      'email.required' => ':attribute আবশ্যক।',
      'email.email' => ':attribute একটি বৈধ ইমেইল হতে হবে।',
      'email.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'email.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',

      'location.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'location.string' => ':attribute একটি টেক্সট হতে হবে।',
      'location.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'location.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'family_members_name.required' => ':attribute আবশ্যক।',
      'family_members_name.string' => ':attribute একটি টেক্সট হতে হবে।',
      'family_members_name.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'family_members_name.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'current_parent.required' => ':attribute আবশ্যক।',
      'current_parent.string' => ':attribute একটি টেক্সট হতে হবে।',
      'current_parent.min' => ':attribute সর্বনিম্ন ২ অক্ষর হতে হবে।',
      'current_parent.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',

      'parent_mobile.required' => ':attribute আবশ্যক।',
      'parent_mobile.string' => ':attribute একটি টেক্সট হতে হবে।',
      'parent_mobile.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'parent_mobile.max' => ':attribute সর্বাধিক ২৫ অক্ষর হতে পারবে।',

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
      'permanent_address' => 'স্থায়ী ঠিকানা',
      'education_medium' => 'শিক্ষা মাধ্যম',
      'previous_exams' => 'পূর্ববর্তী পরীক্ষা',
      'family_members_info' => 'পরিবারের সদস্যদের তথ্য',
      'economic_status' => 'অর্থনৈতিক অবস্থা',
      'profession' => 'পেশা',
      'profession_description' => 'পেশার বিবরণ',
      'mazhab' => 'মাজহাব',
      'prev_marriage' => 'পূর্ববর্তী বিবাহ',

      'name' => 'নাম',
      'email' => 'ইমেইল',
      'location' => 'ঠিকানা',
      'family_members_name' => 'পরিবারের সদস্যদের নাম',
      'current_parent' => 'বর্তমান অভিভাবক',
      'parent_mobile' => 'অভিভাবকের মোবাইল নম্বর',
    ];
  }
}