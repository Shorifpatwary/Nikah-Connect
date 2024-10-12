<?php

namespace App\Http\Requests\Admin\Bio;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBioReligiousActivitiesRequest extends FormRequest
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
      'prayer_habits' => 'nullable|string|min:10|max:1000',
      'haram_relationships' => 'nullable|string|min:10|max:1000',
      'quran_recitation' => 'nullable|string|min:10|max:1000',
      'mahram_adherence' => 'nullable|string|min:10|max:1000',
      'has_beard' => 'nullable|string|min:5|max:1000',
      'entertainment_habits' => 'nullable|string|min:10|max:1000',
      'mazhab' => [
        'required',
        Rule::in(StatusEnum::ALL_MAZHAB),
      ],
      'religious_beliefs' => 'nullable|string|min:10|max:1000',
      'religious_knowledge' => 'nullable|string|min:10|max:1000',
      'family_religious_environment' => 'nullable|string|min:10|max:1000',
    ];
  }

  public function messages(): array
  {
    return [
      'prayer_habits.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'prayer_habits.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'haram_relationships.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'haram_relationships.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'quran_recitation.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'quran_recitation.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'mahram_adherence.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'mahram_adherence.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'has_beard.min' => ':attribute সর্বনিম্ন ৫ অক্ষর হতে হবে।',
      'has_beard.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'entertainment_habits.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'entertainment_habits.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',

      'mazhab.required' => ':attribute নির্বাচন করা আবশ্যক।',
      'mazhab.in' => 'নির্বাচিত :attribute টি সঠিক নয়।',

      'religious_beliefs.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'religious_beliefs.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'religious_knowledge.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'religious_knowledge.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
      'family_religious_environment.min' => ':attribute সর্বনিম্ন ১০ অক্ষর হতে হবে।',
      'family_religious_environment.max' => ':attribute সর্বাধিক ১০০০ অক্ষর হতে পারবে।',
    ];
  }

  public function attributes(): array
  {
    return [
      'prayer_habits' => 'নামাজের অভ্যাস',
      'haram_relationships' => 'হারাম সম্পর্ক',
      'quran_recitation' => 'কুরআন তিলাওয়াত',
      'mahram_adherence' => 'মাহরাম মেনে চলা',
      'has_beard' => 'দাঁড়ি',
      'entertainment_habits' => 'বিনোদনের অভ্যাস',
      'mazhab' => 'মাজহাব',
      'religious_beliefs' => 'ধর্মীয় বিশ্বাস',
      'religious_knowledge' => 'ধর্মীয় জ্ঞান',
      'family_religious_environment' => 'পরিবারের ধর্মীয় পরিবেশ',
    ];
  }
}