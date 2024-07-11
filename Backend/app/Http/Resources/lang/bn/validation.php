<?php

return [

  /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

  'accepted' => ':attribute গ্রহণ করতে হবে।',
  'accepted_if' => ':attribute গ্রহণ করতে হবে যখন :other হল :value।',
  'active_url' => ':attribute একটি বৈধ URL হতে হবে।',
  'after' => ':attribute :date এর পরে একটি তারিখ হতে হবে।',
  'after_or_equal' => ':attribute :date এর পর বা সমান একটি তারিখ হতে হবে।',
  'alpha' => ':attribute শুধুমাত্র অক্ষর থাকতে পারে।',
  'alpha_dash' => ':attribute শুধুমাত্র অক্ষর, সংখ্যা, ড্যাশ এবং আন্ডারস্কোর থাকতে পারে।',
  'alpha_num' => ':attribute শুধুমাত্র অক্ষর এবং সংখ্যা থাকতে পারে।',
  'array' => ':attribute একটি অ্যারে হতে হবে।',
  'ascii' => ':attribute শুধুমাত্র এক বাইটের অক্ষর এবং প্রতীক থাকতে পারে।',
  'before' => ':attribute :date এর আগে একটি তারিখ হতে হবে।',
  'before_or_equal' => ':attribute :date এর আগে বা সমান একটি তারিখ হতে হবে।',
  'between' => [
    'array' => ':attribute এর মধ্যে :min এবং :max আইটেম থাকতে হবে।',
    'file' => ':attribute এর মধ্যে :min এবং :max কিলোবাইট হতে হবে।',
    'numeric' => ':attribute এর মধ্যে :min এবং :max হতে হবে।',
    'string' => ':attribute এর মধ্যে :min এবং :max অক্ষর হতে হবে।',
  ],
  'boolean' => ':attribute ক্ষেত্রটি সত্য বা মিথ্যা হতে হবে।',
  'can' => ':attribute ক্ষেত্রটিতে একটি অননুমোদিত মান রয়েছে।',
  'confirmed' => ':attribute নিশ্চিতকরণ মেলেনি।',
  'current_password' => 'পাসওয়ার্ডটি ভুল।',
  'date' => ':attribute একটি বৈধ তারিখ হতে হবে।',
  'date_equals' => ':attribute :date এর সমান একটি তারিখ হতে হবে।',
  'date_format' => ':attribute :format বিন্যাসের সাথে মেলেনি।',
  'decimal' => ':attribute তে :decimal দশমিক স্থান থাকতে হবে।',
  'declined' => ':attribute অগ্রাহ্য করতে হবে।',
  'declined_if' => ':attribute অগ্রাহ্য করতে হবে যখন :other হল :value।',
  'different' => ':attribute এবং :other ভিন্ন হতে হবে।',
  'digits' => ':attribute হতে হবে :digits অঙ্ক।',
  'digits_between' => ':attribute এর মধ্যে হতে হবে :min এবং :max অঙ্ক।',
  'dimensions' => ':attribute এর অকার্যকর চিত্র মাত্রা রয়েছে।',
  'distinct' => ':attribute ক্ষেত্রের একটি সদৃশ মান রয়েছে।',
  'doesnt_end_with' => ':attribute নিম্নলিখিতগুলির একটিতে শেষ হতে পারে না: :values।',
  'doesnt_start_with' => ':attribute নিম্নলিখিতগুলির একটিতে শুরু হতে পারে না: :values।',
  'email' => ':attribute একটি বৈধ ইমেল ঠিকানা হতে হবে।',
  'ends_with' => ':attribute নিম্নলিখিতগুলির একটিতে শেষ হতে হবে: :values।',
  'enum' => 'নির্বাচিত :attribute অবৈধ।',
  'exists' => 'নির্বাচিত :attribute অবৈধ।',
  'extensions' => ':attribute নিম্নলিখিত এক্সটেনশনগুলির একটি হতে হবে: :values।',
  'file' => ':attribute একটি ফাইল হতে হবে।',
  'filled' => ':attribute ক্ষেত্রটিতে একটি মান থাকতে হবে।',
  'gt' => [
    'array' => ':attribute তে :value আইটেমের বেশি থাকতে হবে।',
    'file' => ':attribute হতে হবে :value কিলোবাইটের বেশি।',
    'numeric' => ':attribute হতে হবে :value এর বেশি।',
    'string' => ':attribute হতে হবে :value অক্ষরের বেশি।',
  ],
  'gte' => [
    'array' => ':attribute তে :value আইটেম বা বেশি থাকতে হবে।',
    'file' => ':attribute হতে হবে :value কিলোবাইটের বেশি বা সমান।',
    'numeric' => ':attribute হতে হবে :value এর বেশি বা সমান।',
    'string' => ':attribute হতে হবে :value অক্ষরের বেশি বা সমান।',
  ],
  'hex_color' => ':attribute একটি বৈধ হেক্সাডেসিমাল রঙ হতে হবে।',
  'image' => ':attribute একটি ছবি হতে হবে।',
  'in' => 'নির্বাচিত :attribute অবৈধ।',
  'in_array' => ':attribute ক্ষেত্রটি :other তে নেই।',
  'integer' => ':attribute একটি পূর্ণসংখ্যা হতে হবে।',
  'ip' => ':attribute একটি বৈধ IP ঠিকানা হতে হবে।',
  'ipv4' => ':attribute একটি বৈধ IPv4 ঠিকানা হতে হবে।',
  'ipv6' => ':attribute একটি বৈধ IPv6 ঠিকানা হতে হবে।',
  'json' => ':attribute একটি বৈধ JSON স্ট্রিং হতে হবে।',
  'lowercase' => ':attribute ছোট হাতের হতে হবে।',
  'lt' => [
    'array' => ':attribute তে :value আইটেমের কম থাকতে হবে।',
    'file' => ':attribute হতে হবে :value কিলোবাইটের কম।',
    'numeric' => ':attribute হতে হবে :value এর কম।',
    'string' => ':attribute হতে হবে :value অক্ষরের কম।',
  ],
  'lte' => [
    'array' => ':attribute তে :value আইটেমের বেশি থাকতে পারবে না।',
    'file' => ':attribute হতে হবে :value কিলোবাইটের কম বা সমান।',
    'numeric' => ':attribute হতে হবে :value এর কম বা সমান।',
    'string' => ':attribute হতে হবে :value অক্ষরের কম বা সমান।',
  ],
  'mac_address' => ':attribute একটি বৈধ MAC ঠিকানা হতে হবে।',
  'max' => [
    'array' => ':attribute তে :max আইটেমের বেশি থাকতে পারবে না।',
    'file' => ':attribute হতে হবে :max কিলোবাইটের বেশি নয়।',
    'numeric' => ':attribute হতে হবে :max এর বেশি নয়।',
    'string' => ':attribute হতে হবে :max অক্ষরের বেশি নয়।',
  ],
  'max_digits' => ':attribute তে :max অঙ্কের বেশি থাকতে পারবে না।',
  'mimes' => ':attribute হতে হবে একটি ফাইলের প্রকার: :values।',
  'mimetypes' => ':attribute হতে হবে একটি ফাইলের প্রকার: :values।',
  'min' => [
    'array' => ':attribute তে অন্তত :min আইটেম থাকতে হবে।',
    'file' => ':attribute হতে হবে অন্তত :min কিলোবাইট।',
    'numeric' => ':attribute হতে হবে অন্তত :min।',
    'string' => ':attribute হতে হবে অন্তত :min অক্ষর।',
  ],
  'min_digits' => ':attribute তে অন্তত :min অঙ্ক থাকতে হবে।',
  'missing' => ':attribute ফিল্ডটি অনুপস্থিত হতে হবে।',
  'missing_if' => ':attribute ফিল্ডটি অনুপস্থিত হতে হবে যখন :other হল :value।',
  'missing_unless' => ':attribute ফিল্ডটি অনুপস্থিত হতে হবে যদি না :other হল :value।',
  'missing_with' => ':attribute ফিল্ডটি অনুপস্থিত হতে হবে যখন :values উপস্থিত।',
  'missing_with_all' => ':attribute ফিল্ডটি অনুপস্থিত হতে হবে যখন :values উপস্থিত।',
  'multiple_of' => ':attribute হতে হবে :value এর গুণিতক।',
  'not_in' => 'নির্বাচিত :attribute অবৈধ।',
  'not_regex' => ':attribute বিন্যাসটি অবৈধ।',
  'numeric' => ':attribute একটি সংখ্যা হতে হবে।',
  'password' => [
    'letters' => ':attribute তে অন্তত একটি অক্ষর থাকতে হবে।',
    'mixed' => ':attribute তে অন্তত একটি বড় হাতের এবং একটি ছোট হাতের অক্ষর থাকতে হবে।',
    'numbers' => ':attribute তে অন্তত একটি সংখ্যা থাকতে হবে।',
    'symbols' => ':attribute তে অন্তত একটি প্রতীক থাকতে হবে।',
    'uncompromised' => 'দেয়া :attribute একটি ডেটা লিকে পাওয়া গেছে। অনুগ্রহ করে একটি ভিন্ন :attribute নির্বাচন করুন।',
  ],
  'present' => ':attribute ফিল্ডটি উপস্থিত থাকতে হবে।',
  'present_if' => ':attribute ফিল্ডটি উপস্থিত থাকতে হবে যখন :other হল :value।',
  'present_unless' => ':attribute ফিল্ডটি উপস্থিত থাকতে হবে যদি না :other হল :value।',
  'present_with' => ':attribute ফিল্ডটি উপস্থিত থাকতে হবে যখন :values উপস্থিত।',
  'present_with_all' => ':attribute ফিল্ডটি উপস্থিত থাকতে হবে যখন :values উপস্থিত।',
  'prohibited' => ':attribute ফিল্ডটি নিষিদ্ধ।',
  'prohibited_if' => ':attribute ফিল্ডটি নিষিদ্ধ যখন :other হল :value।',
  'prohibited_unless' => ':attribute ফিল্ডটি নিষিদ্ধ যদি না :other হল :values।',
  'prohibits' => ':attribute ফিল্ডটি :other কে উপস্থিত থাকা থেকে বাধা দেয়।',
  'regex' => ':attribute বিন্যাসটি অবৈধ।',
  'required' => ':attribute ফিল্ডটি প্রয়োজন।',
  'required_array_keys' => ':attribute ফিল্ডটি থাকতে হবে: :values এর জন্য।',
  'required_if' => ':attribute ফিল্ডটি প্রয়োজন যখন :other হল :value।',
  'required_if_accepted' => ':attribute ফিল্ডটি প্রয়োজন যখন :other গ্রহণ করা হয়।',
  'required_unless' => ':attribute ফিল্ডটি প্রয়োজন যদি না :other হল :values।',
  'required_with' => ':attribute ফিল্ডটি প্রয়োজন যখন :values উপস্থিত।',
  'required_with_all' => ':attribute ফিল্ডটি প্রয়োজন যখন :values উপস্থিত।',
  'required_without' => ':attribute ফিল্ডটি প্রয়োজন যখন :values অনুপস্থিত।',
  'required_without_all' => ':attribute ফিল্ডটি প্রয়োজন যখন :values এর কোনটি উপস্থিত নয়।',
  'same' => ':attribute এবং :other মেলাতে হবে।',
  'size' => [
    'array' => ':attribute তে থাকতে হবে :size আইটেম।',
    'file' => ':attribute হতে হবে :size কিলোবাইট।',
    'numeric' => ':attribute হতে হবে :size।',
    'string' => ':attribute হতে হবে :size অক্ষর।',
  ],
  'starts_with' => ':attribute শুরু হতে হবে নিম্নলিখিতগুলির একটির সাথে: :values।',
  'string' => ':attribute একটি স্ট্রিং হতে হবে।',
  'timezone' => ':attribute একটি বৈধ টাইমজোন হতে হবে।',
  'unique' => ':attribute ইতিমধ্যেই নেওয়া হয়েছে।',
  'uploaded' => ':attribute আপলোড ব্যর্থ হয়েছে।',
  'uppercase' => ':attribute বড় হাতের হতে হবে।',
  'url' => ':attribute একটি বৈধ URL হতে হবে।',
  'ulid' => ':attribute একটি বৈধ ULID হতে হবে।',
  'uuid' => ':attribute একটি বৈধ UUID হতে হবে।',

  /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

  'custom' => [
    'attribute-name' => [
      'rule-name' => 'কাস্টম বার্তা',
    ],
  ],

  /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

  'attributes' => [
    'name' => 'নাম',
    'email' => 'ইমেইল ঠিকানা',
    'password' => 'পাসওয়ার্ড',
    'password_confirmation' => 'পাসওয়ার্ড নিশ্চিতকরণ',
    'current_password' => 'বর্তমান পাসওয়ার্ড',
    'new_password' => 'নতুন পাসওয়ার্ড',
    'new_password_confirmation' => 'নতুন পাসওয়ার্ড নিশ্চিতকরণ',
    'age' => 'বয়স',
    'gender' => 'লিঙ্গ',
    'address' => 'ঠিকানা',
    'city' => 'শহর',
    'state' => 'রাষ্ট্র',
    'country' => 'দেশ',
    'postal_code' => 'পোস্টাল কোড',
    'phone' => 'ফোন নম্বর',
    'mobile' => 'মোবাইল নম্বর',
    'date_of_birth' => 'জন্ম তারিখ',
    'username' => 'ব্যবহারকারীর নাম',
    'bio' => 'জীবনী',
    'description' => 'বর্ণনা',
    'status' => 'স্থিতি',
    'title' => 'শিরোনাম',
    'content' => 'বিষয়বস্তু',
    'tags' => 'ট্যাগ',
    'category' => 'বিভাগ',
    'rating' => 'রেটিং',
    'review' => 'রিভিউ',
    'author' => 'লেখক',
    'image' => 'ছবি',
    'location' => 'অবস্থান',
  ]


];