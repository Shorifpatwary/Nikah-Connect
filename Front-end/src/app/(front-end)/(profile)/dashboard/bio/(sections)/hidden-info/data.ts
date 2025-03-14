import Routes from "@/assets/data/routes";

export const Data = {
  create: {
    title: "গোপনীয় তথ্যাবলি",
    submit: "জমা দিন",

    success: {
      title: "গোপনীয় তথ্য সফলভাবে সংরক্ষিত হয়েছে!",
      description:
        "আপনার গোপনীয় তথ্য সফলভাবে সংরক্ষিত হয়েছে। পরবর্তী ধাপের জন্য দয়া করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।",
      redirectUrl: Routes.profile_bio.url,
    },
    error: {
      title: "গোপনীয় তথ্য সংরক্ষণে সমস্যা!",
      description:
        "আপনার গোপনীয় তথ্য সংরক্ষণ করা সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন। যদি সমস্যা অব্যাহত থাকে, কর্তৃপক্ষের সাথে যোগাযোগ করুন।",
      tryAgainDescription: "দয়া করে সংশোধনী মেনে পুনরায় চেষ্টা করুন।",
      403: {
        title: "আপনি ইতোমধ্যে এই বায়ো ডাটার গোপনীয় তথ্য তৈরি করেছেন।",
        description: "অনুগ্রহ করে পূর্বের তৈরি করা বায়ো ডাটাটি সম্পাদনা করুন।",
        redirectUrl: Routes.profile_bio.hidden_info.edit,
      },
      422: {
        title: "গোপনীয় তথ্যগুলো সঠিকভাবে পূরণ হয়নি।",
        description:
          "অনুগ্রহ করে নিশ্চিত করুন যে আপনি সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করেছেন। আবার চেষ্টা করুন।",
      },
    },
  },
  edit: {
    title: "গোপনীয় তথ্যাবলি",
    submit: "আপডেট করুন",

    success: {
      title: "গোপনীয় তথ্য সফলভাবে আপডেট হয়েছে!",
      description:
        "আপনার গোপনীয় তথ্য সফলভাবে আপডেট হয়েছে। প্রয়োজন অনুযায়ী অন্য তথ্য আপডেট করুন।",
      redirectUrl: Routes.profile_bio.url,
    },
    error: {
      title: "গোপনীয় তথ্য আপডেট করা সম্ভব হয়নি",
      description:
        "আপনার গোপনীয় তথ্য আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      tryAgainDescription: "দয়া করে সংশোধনী মেনে পুনরায় চেষ্টা করুন।",

      422: {
        title: "গোপনীয় তথ্য সঠিকভাবে পূর্ণ করা হয়নি",
        description:
          "আপনার গোপনীয় তথ্য সঠিকভাবে আপডেট করা সম্ভব হয়নি। দয়া করে যাচাই করুন এবং পুনরায় চেষ্টা করুন।",
      },
    },
  },

  wait: "অপেক্ষা করুন...",
  inputs: {
    name: {
      title: "নাম",
      placeholder: "আপনার নাম লিখুন",
      suggestions: [
        "আপনার পূর্ণ নাম লিখুন।",
        "যদি আপনার নামের কোনও ডাকনাম থাকে, তা উল্লেখ করতে পারেন।",
      ],
    },
    email: {
      title: "ইমেইল",
      placeholder: "আপনার ইমেইল ঠিকানা লিখুন",
      suggestions: [
        "আপনার সাথে যোগাযোগ করার জন্য এবং বায়োডাটা গ্রহণের প্রক্রিয়া সঠিকভাবে সম্পন্ন করার জন্য একটি সক্রিয় ইমেইল ঠিকানা দিন।",
      ],
    },
    location: {
      title: "ঠিকানা",
      placeholder: "আপনার বিস্তারিত ঠিকানা লিখুন",
      suggestions: [
        "আপনার বাড়ির নাম, বাসার নম্বর এবং এলাকার নাম উল্লেখ করে পুরো ঠিকানা দিন, যেমন: গ্রাম, নিকটস্থ বাজার, অথবা স্থানীয় উল্লেখযোগ্য স্থান।",
        "যাতায়াতের সুবিধা সম্পর্কে তথ্য দিন, যেমন: পাবলিক ট্রান্সপোর্টের নিকটতা অথবা সড়কের অবস্থা।",
      ],
    },
    family_members_name: {
      title: "পরিবারের সদস্যদের নাম",
      placeholder: "পরিবারের সদস্যদের নাম লিখুন",
      suggestions: ["পরিবারের সদস্যদের নাম এবং সম্পর্কের ধরন উল্লেখ করুন।"],
    },
    current_parent: {
      title: "বর্তমান অভিভাবক",
      placeholder: "বর্তমান অভিভাবকের নাম লিখুন",
    },
    parent_mobile: {
      title: "অভিভাবকের মোবাইল নম্বর",
      placeholder: "অভিভাবকের মোবাইল নম্বর লিখুন",
      suggestions: [
        "আপনার অভিভাবকের সক্রিয় মোবাইল নম্বর দিন, যাতে সহজে যোগাযোগ করা যেতে পারে।",
        "প্রয়োজনে বিকল্প যোগাযোগের জন্য একাধিক নম্বর প্রদান করুন।",
      ],
    },
    social_links: {
      title: "সামাজিক যোগাযোগ মাধ্যমের লিংক সমূহ",
      placeholder: "আপনার সামাজিক যোগাযোগের লিংক যুক্ত করুন",
      suggestions: [
        "আপনার ফেসবুক, ইনস্টাগ্রাম, বা টুইটারের লিংক শেয়ার করুন।",
        "লিংকটি সঠিক ও কার্যকর আছে কিনা তা যাচাই করুন।",
      ],
    },
    permanent_address_map_location: {
      title: "স্থায়ী ঠিকানার মানচিত্রের অবস্থান",
      placeholder: "স্থায়ী ঠিকানার মানচিত্রের লিংক লিখুন",
      suggestions: [
        "আপনার স্থায়ী ঠিকানার গুগল ম্যাপের লিংক প্রদান করুন।",
        "লিংকটি সঠিকভাবে কপি করেছেন কিনা যাচাই করে নিন।",
      ],
    },
    present_address_map_location: {
      title: "বর্তমান ঠিকানার মানচিত্রের অবস্থান",
      placeholder: "বর্তমান ঠিকানার মানচিত্রের লিংক লিখুন",
      suggestions: [
        "আপনার বর্তমান ঠিকানার গুগল ম্যাপের লিংক প্রদান করুন।",
        "লিংকটি সঠিকভাবে কপি করেছেন কিনা যাচাই করে নিন।",
      ],
    },
    documents_links: {
      title: "ডকুমেন্ট লিংক",
      placeholder: "ডকুমেন্টের লিংক যুক্ত করুন",
      suggestions: [
        "বায়োডাটার সাথে সম্পর্কিত সমস্ত ডকুমেন্ট একটি গুগল ড্রাইভ ফোল্ডারে সংরক্ষণ করুন এবং সেই ফোল্ডারের শেয়ারযোগ্য লিংক প্রদান করুন।",
      ],
    },
  },
  unKnownError: {
    title: "কিছু সমস্যা ঘটেছে!",
    description:
      "দয়া করে কর্তৃপক্ষের সাথে যোগাযোগ করুন এবং আপনার সমস্যার বিস্তারিত জানাবেন।",
  },
};

export const VM = {
  name: {
    required: "নাম নির্বাচন করা আবশ্যক।",
    minLength: "নাম সর্বনিম্ন ৫ অক্ষর হতে হবে।",
    maxLength: "নাম সর্বাধিক ১০০ অক্ষর হতে পারবে।",
  },
  email: {
    required: "ইমেইল ঠিকানা প্রদান করা আবশ্যক।",
    email: "এটি একটি ইমেইল হতে হবে।",
    minLength: "ইমেইল ঠিকানা সর্বনিম্ন ৫ অক্ষর হতে হবে।",
    maxLength: "ইমেইল ঠিকানা সর্বাধিক ৫০ অক্ষর হতে পারবে।",
  },
  location: {
    required: "ঠিকানা প্রদান করা আবশ্যক।",
    minLength: "ঠিকানা সর্বনিম্ন ১০ অক্ষর হতে হবে।",
    maxLength: "ঠিকানা সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  family_members_name: {
    required: "পরিবারের সদস্যদের নাম আবশ্যক।",
    minLength: "পরিবারের সদস্যদের নাম সর্বনিম্ন ১০ অক্ষর হতে হবে।",
    maxLength: "পরিবারের সদস্যদের নাম সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  current_parent: {
    required: "বর্তমান অভিভাবকের নাম প্রদান করা আবশ্যক।",
    minLength: "বর্তমান অভিভাবকের নাম সর্বনিম্ন ৫ অক্ষর হতে হবে।",
    maxLength: "বর্তমান অভিভাবকের নাম সর্বাধিক ২৫৫ অক্ষর হতে পারবে।",
  },
  parent_mobile: {
    required: "অভিভাবকের মোবাইল নম্বর প্রদান করা আবশ্যক।",
    minLength: "মোবাইল নম্বর সর্বনিম্ন ১০ অক্ষর হতে হবে।",
    maxLength: "মোবাইল নম্বর সর্বাধিক ৩০ অক্ষর হতে পারবে।",
  },
  social_links: {
    maxLength: "সামাজিক যোগাযোগের লিংক সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  permanent_address_map_location: {
    maxLength: "স্থায়ী ঠিকানার মানচিত্রের লিংক সর্বাধিক ২৫৫ অক্ষর হতে পারবে।",
  },
  present_address_map_location: {
    maxLength: "বর্তমান ঠিকানার মানচিত্রের লিংক সর্বাধিক ২৫৫ অক্ষর হতে পারবে।",
  },
  documents_links: {
    maxLength: "ডকুমেন্ট লিংক সর্বাধিক ২৫০ অক্ষর হতে পারবে।",
  },
};
