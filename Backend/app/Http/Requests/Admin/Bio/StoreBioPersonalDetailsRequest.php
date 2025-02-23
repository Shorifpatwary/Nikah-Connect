<?php

namespace App\Http\Requests\Admin\Bio;

use Illuminate\Foundation\Http\FormRequest;

class StoreBioPersonalDetailsRequest extends FormRequest
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
      'about_yourself' => 'required|string|min:10|max:2500',
      'outdoor_clothing' => 'required|string|min:10|max:1000',
      'physical_mental_illness' => 'required|string|min:10|max:1000',
      'favorite_books' => 'nullable|string|min:10|max:1000',
      'favorite_online_personalities' => 'nullable|string|min:10|max:1000',
      'device_usage_time' => 'nullable|string|min:10|max:1000',
      'affiliations' => 'nullable|string|min:10|max:1000',
    ];
  }

  public function messages()
  {
    return [
      'about_yourself.required' => ':attribute আবশ্যক।',
      'about_yourself.string' => ':attribute একটি টেক্সট হতে হবে।',
      'about_yourself.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'about_yourself.max' => ':attribute সর্বাধিক ২৫০০ অক্ষর হতে পারবে।',
      'outdoor_clothing.required' => ':attribute আবশ্যক।',
      'outdoor_clothing.string' => ':attribute একটি টেক্সট হতে হবে।',
      'outdoor_clothing.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'outdoor_clothing.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'physical_mental_illness.required' => ':attribute আবশ্যক।',
      'physical_mental_illness.string' => ':attribute একটি টেক্সট হতে হবে।',
      'physical_mental_illness.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'physical_mental_illness.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'favorite_books.string' => ':attribute একটি টেক্সট হতে হবে।',
      'favorite_books.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'favorite_books.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'favorite_online_personalities.string' => ':attribute একটি টেক্সট হতে হবে।',
      'favorite_online_personalities.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'favorite_online_personalities.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'device_usage_time.string' => ':attribute একটি টেক্সট হতে হবে।',
      'device_usage_time.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'device_usage_time.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'affiliations.string' => ':attribute একটি টেক্সট হতে হবে।',
      'affiliations.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'affiliations.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
    ];
  }

  public function attributes()
  {
    return [
      'about_yourself' => 'নিজের সম্পর্কে',
      'outdoor_clothing' => 'আউটডোর পোশাক',
      'physical_mental_illness' => 'শারীরিক/মানসিক অসুস্থতা',
      'favorite_books' => 'প্রিয় বই',
      'favorite_online_personalities' => 'প্রিয় অনলাইন ব্যক্তিত্ব',
      'device_usage_time' => 'ডিভাইস ব্যবহারের সময়',
      'affiliations' => 'অ্যাসোসিয়েশন',
    ];
  }
}