import Routes from "@/assets/data/routes";

export const Data = {
  create: {
    title: "বিবাহের তথ্য",
    submit: "জমা দিন",

    success: {
      title: "বিবাহের তথ্য সফলভাবে সংরক্ষিত হয়েছে!",
      description:
        "আপনার বিবাহের তথ্য সফলভাবে সংরক্ষিত হয়েছে। পরবর্তী ধাপের জন্য দয়া করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।",
      redirectUrl: Routes.profile_bio.url,
    },
    error: {
      title: "বিবাহের তথ্য সংরক্ষণে সমস্যা!",
      description:
        "আপনার বিবাহের তথ্য সংরক্ষণ করা সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন। যদি সমস্যা অব্যাহত থাকে, কর্তৃপক্ষের সাথে যোগাযোগ করুন।",
      tryAgainDescription: "দয়া করে সংশোধনী মেনে পুনরায় চেষ্টা করুন।",
      403: {
        title: "আপনি ইতোমধ্যে এই বায়ো ডাটার বিবাহের তথ্য তৈরি করেছেন।",
        description: "অনুগ্রহ করে পূর্বের তৈরি করা বায়ো ডাটাটি সম্পাদনা করুন।",
        redirectUrl: Routes.profile_bio.marital_info.edit,
      },
      422: {
        title: "বিবাহের তথ্যগুলো সঠিকভাবে পূরণ হয়নি।",
        description:
          "অনুগ্রহ করে নিশ্চিত করুন যে আপনি সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করেছেন। আবার চেষ্টা করুন।",
      },
    },
  },
  edit: {
    title: "বিবাহ সম্পর্কিত তথ্য",
    submit: "আপডেট করুন",
    success: {
      title: "বিবাহ সম্পর্কিত তথ্য সফলভাবে আপডেট হয়েছে",
      description:
        "আপনার বিবাহ সম্পর্কিত তথ্য সফলভাবে আপডেট হয়েছে। প্রয়োজন অনুযায়ী অন্য তথ্য আপডেট করুন।",
      redirectUrl: Routes.profile_bio.url,
      shortToLongRedirect: Routes.profile_bio.expected_partner.edit,
    },
    error: {
      title: "বিবাহ সম্পর্কিত তথ্য আপডেট করা সম্ভব হয়নি",
      description:
        "আপনার বিবাহ সম্পর্কিত তথ্য আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      tryAgainDescription: "দয়া করে সংশোধনী মেনে পুনরায় চেষ্টা করুন।",
      422: {
        title: "বিবাহ সম্পর্কিত তথ্য সঠিকভাবে পূর্ণ করা হয়নি",
        description:
          "আপনার বিবাহ সম্পর্কিত তথ্য সঠিকভাবে আপডেট করা সম্ভব হয়নি। দয়া করে যাচাই করুন এবং পুনরায় চেষ্টা করুন।",
      },
    },
  },
  wait: "অপেক্ষা করুন...",
  inputs: {
    prev_marriage: {
      title: "পূর্ববর্তী বিবাহ",
      placeholder: "পূর্ববর্তী বিবাহ সংক্রান্ত তথ্য লিখুন",
      suggestions: [
        "আপনার পূর্ববর্তী বিবাহের সময়কাল, বিবাহবিচ্ছেদের কারণ, সন্তানের সংখ্যা ও তাদের বর্তমান অবস্থা ইত্যাদি বিস্তারিতভাবে উল্লেখ করুন।",
      ],
    },
    work_after: {
      title: "বিবাহের পর চাকরি করতে চান?",
      placeholder: "বিবাহের পর কর্মজীবন সংক্রান্ত মতামত লিখুন",
      suggestions: [
        "বিবাহের পর কর্মজীবনে প্রবেশ বা অব্যাহত রাখার ইচ্ছা থাকলে তা উল্লেখ করুন।",
      ],
    },
    study_after: {
      title: "বিবাহের পর পড়াশোনা চালিয়ে যেতে চান?",
      placeholder: "বিবাহের পর পড়াশোনা সংক্রান্ত মতামত লিখুন",
      suggestions: [
        "বিবাহের পর শিক্ষাগত কার্যক্রম অব্যাহত রাখার ইচ্ছা থাকলে তা উল্লেখ করুন।",
      ],
    },
    ceremony_plans: {
      title: "বিবাহের অনুষ্ঠানের পরিকল্পনা",
      placeholder: "বিবাহের অনুষ্ঠান সম্পর্কিত পরিকল্পনা লিখুন",
      suggestions: [
        "বিবাহের জন্য আপনার অনুষ্ঠানের ধরণ, আয়োজনের বিশদ বিবরণ এবং কোনো বিশেষ রীতি বা ঐতিহ্য অনুসরণ করার পরিকল্পনা থাকলে তা উল্লেখ করুন।",
      ],
    },
    partner_view_rules: {
      title: "পাত্র / পাত্রী দেখার নিয়ম",
      placeholder: "পাত্র / পাত্রী দেখার নিয়ম সম্পর্কে লিখুন",
      suggestions: [
        "পাত্র/পাত্রী দেখার নিয়ম সম্পর্কিত আপনার মতামত বা পরিবার থেকে কীভাবে দেখা হয় তা লিখুন।",
      ],
    },
    marriage_weakness: {
      title: "নিজ পক্ষের দুর্বলতা",
      placeholder: "আপনার পক্ষের দুর্বলতা সম্পর্কে লিখুন",
      suggestions: [
        "আপনার পরিবার বা ব্যক্তিগত পক্ষের বিবাহ সংক্রান্ত কোনো বিশেষ দুর্বলতা, আর্থিক সীমাবদ্ধতা, বা অন্য কোনো চ্যালেঞ্জ থাকলে তা বিশদভাবে উল্লেখ করুন।",
      ],
    },
    family_pref: {
      title: "পরিবারের পছন্দ",
      placeholder: "পরিবারের পছন্দ সংক্রান্ত তথ্য লিখুন",
      suggestions: [
        "বিবাহের ক্ষেত্রে আপনার পরিবারের পছন্দ, তাদের মূল্যবোধ, এবং সিদ্ধান্ত গ্রহণ প্রক্রিয়ায় তাদের মতামত কীভাবে ভূমিকা রাখে তা বিস্তারিতভাবে লিখুন।",
      ],
    },
    compromise_factors: {
      title: "ছাড় দেওয়ার বিষয়াবলি",
      placeholder: "বিবাহে ছাড় দেওয়ার বিষয়ে মতামত লিখুন",
      suggestions: [
        "বিবাহের ক্ষেত্রে আপনি কোন বিষয়গুলোতে ছাড় দিতে প্রস্তুত? দয়া করে বিস্তারিতভাবে উল্লেখ করুন।",
      ],
    },
    dowry_amount: {
      title: "মোহরানার পরিমাণ",
      placeholder: "আপনার মোহরানার পরিমাণ সম্পর্কে মতামত দিন",
      suggestions: [
        "মোহরানার পরিমাণ কী হবে এবং সেটি কিভাবে নির্ধারণ করবেন, সেই বিষয়ে আপনার পরিকল্পনা ও ইচ্ছার বিস্তারিত বর্ণনা দিন।",
      ],
    },
    dowry_opinion: {
      title: "মোহরানা সম্পর্কে মতামত",
      placeholder: "মোহরানার ব্যাপারে আপনার মতামত লিখুন",
      suggestions: [
        "মোহরানা সম্পর্কে আপনার মতামত বা ধারণা কী? দয়া করে আপনার চিন্তাভাবনাগুলি বিস্তারিতভাবে লিখুন।",
        "মোহরানা সংক্রান্ত বিভিন্ন আনৈসলামিক প্রথা বা রীতি সম্পর্কে আপনার মতামত থাকলে তা বিস্তারিতভাবে উল্লেখ করুন।",
      ],
    },
    cash_gift_opinion: {
      title: "সমাজে প্রচলিত বিভিন্ন উপহার পাঠানো সম্পর্কে মতামত",
      placeholder:
        "বিয়ের আগে বা পরে উপহার বা নগদ অর্থ প্রদান নিয়ে আপনার মতামত লিখুন",
      suggestions: [
        "সমাজে প্রচলিত বিভিন্ন প্রথা অনুযায়ী বিয়ের আগে বা পরে অপর পক্ষকে নগদ অর্থ প্রদান বা অন্যান্য উপহার দেওয়ার বিষয়ে আপনার মতামত কী? দয়া করে বিস্তারিতভাবে আপনার চিন্তাভাবনা শেয়ার করুন।",
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
  prev_marriage: {
    maxLength: "পূর্ববর্তী বিবাহ সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  work_after: {
    required: "বিবাহের পর কর্মজীবন সম্পর্কিত তথ্য দেওয়া আবশ্যক।",
    maxLength:
      "বিবাহের পর কর্মজীবন সম্পর্কিত তথ্য সর্বাধিক ২৫৫ অক্ষর হতে পারবে।",
  },
  study_after: {
    required: "বিবাহের পর পড়াশোনা সম্পর্কিত তথ্য দেওয়া আবশ্যক।",
    maxLength:
      "বিবাহের পর পড়াশোনা সম্পর্কিত তথ্য সর্বাধিক ২৫৫ অক্ষর হতে পারবে।",
  },
  ceremony_plans: {
    maxLength: "বিবাহের অনুষ্ঠানের পরিকল্পনা সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  partner_view_rules: {
    maxLength:
      "পাত্র / পাত্রী দেখার নিয়ম সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  marriage_weakness: {
    maxLength: "দুর্বলতা সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  family_pref: {
    maxLength: "পরিবার পছন্দ সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  compromise_factors: {
    maxLength:
      "ছাড় দেওয়ার বিষয়াবলি সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  dowry_amount: {
    required: "মোহরানার পরিমাণ সম্পর্কিত তথ্য দেওয়া আবশ্যক।",
    minLength: "মোহরানার পরিমাণ সম্পর্কিত তথ্য সর্বনিম্ন ৫ অক্ষর হতে হবে।",
    maxLength: "মোহরানার পরিমাণ সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  dowry_opinion: {
    maxLength: "মোহরানা সম্পর্কে মতামত সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  cash_gift_opinion: {
    maxLength: "নগদ উপহার সম্পর্কে মতামত সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
};
