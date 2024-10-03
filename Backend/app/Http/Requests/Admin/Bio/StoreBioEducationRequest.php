<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioEducationRequest extends FormRequest
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
      'education_medium' => [
        'required',
        Rule::in(array_values(StatusEnum::EDUCATION_MEDIUM)),
      ],
      'highest_qualification' => 'required|string|max:1000',
      'current_study' => 'nullable|string|max:1000',
      'previous_exams' => 'required|string|max:2500',
      'other_qualifications' => 'nullable|string|max:2500',
    ];
  }

  public function messages()
  {
    return [
      'education_medium.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'education_medium.in' => ':attribute এর মান সঠিক নয়।',
      'highest_qualification.required' => ':attribute আবশ্যক।',
      'highest_qualification.string' => ':attribute একটি টেক্সট হতে হবে।',
      'highest_qualification.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'current_study.string' => ':attribute একটি টেক্সট হতে হবে।',
      'current_study.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'previous_exams.required' => ':attribute আবশ্যক।',
      'previous_exams.string' => ':attribute একটি টেক্সট হতে হবে।',
      'previous_exams.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',
      'other_qualifications.string' => ':attribute একটি টেক্সট হতে হবে।',
      'other_qualifications.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',
    ];
  }

  public function attributes()
  {
    return [
      'education_medium' => 'শিক্ষা মাধ্যম',
      'highest_qualification' => 'সর্বোচ্চ যোগ্যতা',
      'current_study' => 'বর্তমান অধ্যয়ন',
      'previous_exams' => 'পূর্ববর্তী পরীক্ষা',
      'other_qualifications' => 'অন্যান্য যোগ্যতা',
    ];
  }
}
