<?php

namespace App\Http\Requests\Admin\Bio;

use App\Models\Bio;
use App\Models\GeneralSection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioMarriageInfoRequest extends FormRequest
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
    // Fetch the logged-in user's bio and general section
    $bio = Bio::where('user_id', auth()->id())->first();
    $existing = GeneralSection::where('bio_id', $bio->id)->first();

    // Fetch marital_status from the GeneralSection table
    $maritalStatus = $existing ? $existing->marital_status : null;
    return [
      'prev_marriage' =>
      [
        'nullable',
        'string',
        'min:10',
        'max:1000',
        // Apply required rule if marital_status is not 'অবিবাহিত'
        Rule::requiredIf($maritalStatus !== 'অবিবাহিত'),
      ],
      'work_after' => 'required|string|min:5|max:255',
      'study_after' => 'required|string|min:5|max:255',
      'ceremony_plans' => 'nullable|string|min:10|max:1000',
      'partner_view_rules' => 'nullable|string|min:10|max:1000',
      'marriage_weakness' => 'nullable|string|min:10|max:1000',
      'family_pref' => 'nullable|string|min:10|max:1000',
      'compromise_factors' => 'nullable|string|min:10|max:1000',
      'dowry_amount' => 'required|string|min:5|max:1000',
      'dowry_opinion' => 'nullable|string|min:10|max:1000',
      'cash_gift_opinion' => 'nullable|string|min:10|max:1000',
    ];
  }


  public function messages(): array
  {
    return [
      'prev_marriage.required' =>
      ':attribute আবশ্যক।',
      'prev_marriage.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'prev_marriage.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'work_after.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'work_after.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'work_after.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',
      'study_after.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'study_after.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'study_after.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',
      'ceremony_plans.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'ceremony_plans.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'partner_view_rules.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'partner_view_rules.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'marriage_weakness.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'marriage_weakness.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'family_pref.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'family_pref.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'compromise_factors.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'compromise_factors.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'dowry_amount.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'dowry_amount.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'dowry_amount.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'dowry_opinion.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'dowry_opinion.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'cash_gift_opinion.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'cash_gift_opinion.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
    ];
  }

  public function attributes(): array
  {
    return [
      'prev_marriage' => 'পূর্ববর্তী বিবাহ',
      'work_after' => 'বিবাহের পর কর্মজীবন',
      'study_after' => 'বিবাহের পর পড়াশোনা',
      'ceremony_plans' => 'বিবাহের অনুষ্ঠানের পরিকল্পনা',
      'partner_view_rules' => 'পাত্র / পাত্রী দেখার নিয়ম',
      'marriage_weakness' => 'নিজ পক্ষের দুর্বলতা',
      'family_pref' => 'পরিবার পছন্দ',
      'compromise_factors' => 'ছাড় দেওয়ার বিষয়াবলি',
      'dowry_amount' => 'মোহরানার পরিমাণ',
      'dowry_opinion' => 'মোহরানা সম্পর্কে মতামত',
      'cash_gift_opinion' => 'নগদ উপহার সম্পর্কে মতামত',
    ];
  }
}