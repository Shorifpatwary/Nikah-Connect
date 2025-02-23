<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioProfessionRequest extends FormRequest
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
      'profession' => [
        'required',
        Rule::in(StatusEnum::PROFESSION_STATUS)
      ],
      'profession_description' => 'required|string|min:10|max:2500',
      'monthly_income' => 'required|string|min:5|max:1000',
    ];
  }

  public function messages(): array
  {
    return [
      'profession.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'profession.in' => 'নির্বাচিত :attribute টি সঠিক নয়।',

      'profession_description.required' => ':attribute আবশ্যক।',
      'profession_description.string' => ':attribute একটি টেক্সট হতে হবে।',
      'profession_description.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'profession_description.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',

      'monthly_income.required' => ':attribute আবশ্যক।',
      'monthly_income.string' => ':attribute একটি টেক্সট হতে হবে।',
      'monthly_income.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'monthly_income.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
    ];
  }

  public function attributes(): array
  {
    return [
      'profession' => 'পেশা',
      'profession_description' => 'পেশার বিবরণ',
      'monthly_income' => 'মাসিক আয়',
    ];
  }
}