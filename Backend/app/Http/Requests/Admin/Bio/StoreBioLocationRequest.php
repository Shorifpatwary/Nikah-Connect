<?php

namespace App\Http\Requests\Admin\Bio;

use Illuminate\Foundation\Http\FormRequest;

class StoreBioLocationRequest extends FormRequest
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
      'permanent_address' => ['required', 'string', 'between:10,1000'],
      'present_address' => ['nullable', 'string', 'between:10,1000'],
      'relocate_plan' => ['nullable', 'string', 'between:10,1000'],
      'childhood_address' => ['nullable', 'string', 'between:10,1000'],
    ];
  }

  public function messages()
  {
    return [
      'permanent_address.required' => ':attribute আবশ্যক।',

      'permanent_address.between' => ':attribute ১০ থেকে ১০০০ অক্ষরের এর মধ্যে হতে হবে।',
      'present_address.between' => ':attribute ১০ থেকে ১০০০ অক্ষরের এর মধ্যে হতে হবে।',
      'relocate_plan.between' => ':attribute ১০ থেকে ১০০০ অক্ষরের এর মধ্যে হতে হবে।',
      'childhood_address.between' => ':attribute ১০ থেকে ১০০০ অক্ষরের এর মধ্যে হতে হবে।',
    ];
  }
  public function attributes()
  {
    return [
      'permanent_address' => 'স্থায়ী ঠিকানা',
      'present_address' => 'বর্তমান ঠিকানা',
      'relocate_plan' => 'পুনর্বাসন পরিকল্পনা',
      'childhood_address' => 'শৈশবের ঠিকানা',
    ];
  }
}