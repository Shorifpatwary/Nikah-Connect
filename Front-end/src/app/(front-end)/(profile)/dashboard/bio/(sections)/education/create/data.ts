import Routes from "@/assets/data/routes";

export const Data = {
  title: "শিক্ষা সংবলিত তথ্য",
  submit: "শিক্ষা তথ্য জমা দিন",
  wait: "দয়া করে অপেক্ষা করুন...",

  success: {
    title: "শিক্ষা সংবলিত তথ্য সফলভাবে সংরক্ষিত হয়েছে!",
    description:
      "আপনার শিক্ষা সংবলিত তথ্য সফলভাবে সংরক্ষিত হয়েছে। পরবর্তী ধাপের জন্য দয়া করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।",
    redirectUrl: Routes.profile_bio.personal_info.create,
  },
  error: {
    title: "শিক্ষা সংবলিত তথ্য সংরক্ষণে সমস্যা!",
    description:
      "আপনার শিক্ষা সংবলিত তথ্য সংরক্ষণ করা সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন। যদি সমস্যা অব্যাহত থাকে, কর্তৃপক্ষের সাথে যোগাযোগ করুন।",
    403: {
      title: "আপনি ইতোমধ্যে এই বায়ো ডাটার শিক্ষা সংবলিত তথ্য তৈরি করেছেন।",
      description: "অনুগ্রহ করে পূর্বের তৈরি করা বায়ো ডাটাটি সম্পাদনা করুন।",
    },
    422: {
      title: "শিক্ষা সংবলিত তথ্যগুলো সঠিকভাবে পূরণ হয়নি।",
      description:
        "অনুগ্রহ করে নিশ্চিত করুন যে আপনি সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করেছেন। আবার চেষ্টা করুন।",
    },
  },
  inputs: {
    education_medium: {
      title: "শিক্ষার মাধ্যম",
      triggerText: "আপনার শিক্ষা প্রতিষ্ঠানের শিক্ষার মাধ্যম নির্বাচন করুন",
    },

    current_study: {
      title: "বর্তমান অধ্যয়ন",
      placeholder: "বর্তমান অধ্যয়ন বিষয় উল্লেখ করুন",
      suggestions: [
        "আপনার বর্তমানে অধ্যয়নরত বিষয় এবং প্রতিষ্ঠান উল্লেখ করুন।",
        "যদি আপনার বিশেষত্ব থাকে, যেমন গবেষণা বা প্রকল্প, সেগুলোও উল্লেখ করুন।",
      ],
    },
    highest_qualification: {
      title: "সর্বোচ্চ শিক্ষাগত যোগ্যতা",
      placeholder: "আপনার সর্বোচ্চ যোগ্যতা লিখুন",
      suggestions: [
        "আপনার সর্বোচ্চ অর্জিত শিক্ষা স্তর, যেমন স্নাতক বা স্নাতকোত্তর, উল্লেখ করুন।",
        "যদি একাধিক যোগ্যতা থাকে, তবে সেগুলোর তালিকা তৈরি করুন।",
      ],
    },
    previous_exams: {
      title: "পূর্ববর্তী পরীক্ষা",
      placeholder: "পূর্ববর্তী পরীক্ষার তথ্য লিখুন",
      suggestions: [
        "আপনার পূর্ববর্তী পরীক্ষার বিস্তারিত তথ্য দিন, যেমন: পরীক্ষার নাম, সাল, প্রতিষ্ঠান, বিভাগ এবং প্রাপ্ত ফলাফল।",
        "যদি কোনো বিশেষ পরীক্ষার ফলাফল থাকে, তা উল্লেখ করুন।",
      ],
    },
    other_qualifications: {
      title: "অন্যান্য যোগ্যতা",
      placeholder: "অন্যান্য যোগ্যতা উল্লেখ করুন",
      suggestions: [
        "যেকোনো অন্যান্য যোগ্যতা, যেমন প্রশিক্ষণ কোর্স অথবা সার্টিফিকেট, উল্লেখ করুন।",
        "আপনার বিশেষ দক্ষতা উল্লেখ করুন যা শিক্ষার সাথে সম্পর্কিত।",
      ],
    },
  },
  unKnownError: {
    title: "কিছু সমস্যা ঘটেছে!",
    description:
      "দয়া করে কর্তৃপক্ষের সাথে যোগাযোগ করুন এবং আপনার সমস্যার বিস্তারিত জানাবেন।",
  },
};
// Validation Message
export const VM = {
  highest_qualification: {
    required:
      "সর্বোচ্চ শিক্ষাগত যোগ্যতা আবশ্যক। দয়া করে আপনার সর্বোচ্চ অর্জিত শিক্ষা উল্লেখ করুন।",
    minLength: "শিক্ষাগত যোগ্যতা সর্বনিম্ন ৫ অক্ষর হতে হবে।",
    maxLength:
      "সর্বোচ্চ শিক্ষাগত যোগ্যতা সর্বাধিক ১০০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  current_study: {
    maxLength:
      "বর্তমান অধ্যয়ন সর্বাধিক ১০০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  previous_exams: {
    required:
      "পূর্ববর্তী পরীক্ষা আবশ্যক। দয়া করে আপনার পূর্ববর্তী পরীক্ষার তথ্য উল্লেখ করুন।",
    minLength: "পূর্ববর্তী পরীক্ষা তথ্য সর্বনিম্ন ৫০ অক্ষর হতে হবে।",
    maxLength:
      "পূর্ববর্তী পরীক্ষা তথ্য সর্বাধিক ২৫০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  other_qualifications: {
    maxLength:
      "অন্যান্য যোগ্যতা সর্বাধিক ২৫০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  education_medium: {
    required:
      "শিক্ষার মাধ্যম নির্বাচন করা আবশ্যক। দয়া করে আপনার শিক্ষার মাধ্যম নির্বাচন করুন।",
  },
};
