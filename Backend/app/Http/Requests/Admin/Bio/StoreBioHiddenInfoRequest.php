<?php

namespace App\Http\Requests\Admin\Bio;

use Illuminate\Foundation\Http\FormRequest;

class StoreBioHiddenInfoRequest extends FormRequest
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
      'name' => 'required|string|min:2|max:255',
      'email' => 'required|email|min:5|max:255',
      'location' => 'required|string|min:5|max:1000',
      'family_members_name' => 'required|string|min:5|max:1000',
      'current_parent' => 'required|string|min:2|max:255',
      'parent_mobile' => 'required|string|min:10|max:25',
      'social_links' => 'nullable|string|min:5|max:1000',
      'permanent_address_map_location' => 'nullable|string|min:5|max:255',
      'present_address_map_location' => 'nullable|string|min:5|max:255',
      'documents_link' => 'nullable|url|min:5|max:100',
    ];
  }

  public function messages()
  {
    return [
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

      'social_links.string' => ':attribute একটি টেক্সট হতে হবে।',
      'social_links.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'social_links.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'permanent_address_map_location.string' => ':attribute একটি টেক্সট হতে হবে।',
      'permanent_address_map_location.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'permanent_address_map_location.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',

      'present_address_map_location.string' => ':attribute একটি টেক্সট হতে হবে।',
      'present_address_map_location.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'present_address_map_location.max' => ':attribute সর্বাধিক ২৫৫ অক্ষর হতে পারবে।',

      'documents_link.url' => ':attribute একটি বৈধ URL হতে হবে।',
      'documents_link.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'documents_link.max' => ':attribute সর্বাধিক ১০০ অক্ষর হতে পারবে।',
    ];
  }

  public function attributes()
  {
    return [
      'name' => 'নাম',
      'email' => 'ইমেইল',
      'location' => 'ঠিকানা',
      'family_members_name' => 'পরিবারের সদস্যদের নাম',
      'current_parent' => 'বর্তমান অভিভাবক',
      'parent_mobile' => 'অভিভাবকের মোবাইল নম্বর',
      'social_links' => 'সামাজিক যোগাযোগের লিঙ্ক',
      'permanent_address_map_location' => 'স্থায়ী ঠিকানার মানচিত্র অবস্থান',
      'present_address_map_location' => 'বর্তমান ঠিকানার মানচিত্র অবস্থান',
      'documents_link' => 'দস্তাবেজ লিঙ্ক',
    ];
  }
}