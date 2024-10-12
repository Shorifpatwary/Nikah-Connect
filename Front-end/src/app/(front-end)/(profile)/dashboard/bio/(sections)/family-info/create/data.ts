import Routes from "@/assets/data/routes";

export const Data = {
  title: "পারিবারিক তথ্য",
  submit: "পারিবারিক তথ্য জমা দিন",
  wait: "দয়া করে অপেক্ষা করুন...",

  success: {
    title: "পারিবারিক তথ্য সফলভাবে সংরক্ষিত হয়েছে!",
    description:
      "আপনার পারিবারিক তথ্য সফলভাবে সংরক্ষিত হয়েছে। পরবর্তী ধাপের জন্য দয়া করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।",
    redirectUrl: Routes.profile_bio.profession.create,
  },
  error: {
    title: "পারিবারিক তথ্য সংরক্ষণে সমস্যা!",
    description:
      "আপনার পারিবারিক তথ্য সংরক্ষণ করা সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন। যদি সমস্যা অব্যাহত থাকে, কর্তৃপক্ষের সাথে যোগাযোগ করুন।",
    403: {
      title: "আপনি ইতোমধ্যে এই বায়ো ডাটার পারিবারিক তথ্য তৈরি করেছেন।",
      description: "অনুগ্রহ করে পূর্বের তৈরি করা বায়ো ডাটাটি সম্পাদনা করুন।",
    },
    422: {
      title: "পারিবারিক তথ্যগুলো সঠিকভাবে পূরণ হয়নি।",
      description:
        "অনুগ্রহ করে নিশ্চিত করুন যে আপনি সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করেছেন। আবার চেষ্টা করুন।",
    },
  },
  inputs: {
    family_members_info: {
      title: "পারিবারিক সদস্যদের তথ্য",
      placeholder: "আপনার পরিবারের সদস্যদের তথ্য দিন",
      suggestions: [
        "আপনার পরিবারের সদস্যদের নাম, বয়স এবং তাদের সম্পর্কের ধরন উল্লেখ করুন।",
        "পারিবারিক সদস্যদের পেশা, শিক্ষা এবং তাদের কর্মজীবনের অবস্থা সম্পর্কে বিস্তারিত তথ্য দিন।",
      ],
    },
    uncles_info: {
      title: "চাচা/মামার তথ্য",
      placeholder: "আপনার চাচা বা মামার সম্পর্কে তথ্য দিন",
      suggestions: [
        "চাচা বা মামাদের নাম, বয়স এবং পেশা উল্লেখ করুন।",
        "যদি কোন বিশেষ ঘটনা ঘটে থাকে, তা উল্লেখ করুন।",
      ],
    },
    descent: {
      title: "বংশ পরিচয়",
      placeholder: "আপনার বংশ পরিচয় উল্লেখ করুন",
      suggestions: [
        "আপনার পরিবারের বংশ সম্পর্কে কিছু বলুন।",
        "বংশের ঐতিহ্য এবং ইতিহাস উল্লেখ করতে পারেন।",
      ],
    },
    economic_status: {
      title: "আর্থিক অবস্থা",
      triggerText: "আপনার পরিবারের আর্থিক অবস্থা নির্বাচন করুন",
    },
    economic_status_details: {
      title: "আর্থিক অবস্থার বিস্তারিত",
      placeholder: "আপনার আর্থিক অবস্থার বিস্তারিত দিন",
      suggestions: [
        "আপনার পরিবারের খরচের প্রধান খাত উল্লেখ করুন।",
        "আপনার পরিবারের আর্থিক স্থিতিশীলতা কেমন? উল্লেখ করুন।",
      ],
    },
  },
  unKnownError: {
    title: "কিছু সমস্যা ঘটেছে!",
    description:
      "দয়া করে কর্তৃপক্ষের সাথে যোগাযোগ করুন এবং আপনার সমস্যার বিস্তারিত জানাবেন।",
  },
};

// Validation Messages
export const VM = {
  family_members_info: {
    required: "পারিবারিক সদস্যদের তথ্য আবশ্যক। দয়া করে তথ্য পূরণ করুন।",
    minLength: "পারিবারিক সদস্যদের তথ্য সর্বনিম্ন ১০ অক্ষর হতে হবে।",
    maxLength:
      "পারিবারিক সদস্যদের তথ্য সর্বাধিক ২৫০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  uncles_info: {
    maxLength:
      "চাচা/মামার তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  descent: {
    maxLength:
      "বংশ পরিচয় তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে। দয়া করে সংক্ষিপ্ত করুন।",
  },
  economic_status: {
    required: "আর্থিক অবস্থা নির্বাচন করা আবশ্যক।",
  },
  economic_status_details: {
    required: "আর্থিক অবস্থার বিস্তারিত তথ্য আবশ্যক।",
    minLength: "আর্থিক অবস্থার বিস্তারিত সর্বনিম্ন ১০ অক্ষর হতে হবে।",
    maxLength:
      "আর্থিক অবস্থার বিস্তারিত সর্বাধিক ১৫০০ অক্ষর হতে পারবে না। দয়া করে সংক্ষিপ্ত করুন।",
  },
};
