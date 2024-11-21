import Routes from "@/assets/data/routes";

export const Data = {
  title: "সাধারণ তথ্য",
  submit: "জমা দিন",
  wait: "অপেক্ষা করুন...",

  success: {
    title: "সাধারণ তথ্য সফলভাবে জমা হয়েছে",
    description:
      "আপনার বায়োডাটার সাধারণ তথ্য সফলভাবে জমা হয়েছে। অনুগ্রহ করে পরবর্তী ধাপের তথ্য পূরণ করুন।",
    redirectUrl: Routes.profile_bio.location.create,
  },
  error: {
    title: "সাধারণ তথ্য জমা করা সম্ভব হয়নি",
    description:
      "আপনার বায়োডাটার সাধারণ তথ্য জমা করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    403: {
      title: "আপনার বায়োডাটার সাধারণ তথ্য ইতোমধ্যে বিদ্যমান",
      description: "আপনার পূর্বে জমা করা বায়োডাটা সম্পাদনা করুন।",
    },
    422: {
      title: "সাধারণ তথ্য সঠিকভাবে পূরণ করা হয়নি",
      description:
        "আপনার সাধারণ তথ্য জমা করা সম্ভব হয়নি। দয়া করে যাচাই করুন এবং পুনরায় চেষ্টা করুন।",
    },
  },
  inputs: {
    gender: {
      title: "বায়োডাটার ধরন",
      triggerText: "আপনার বায়োডাটার ধরন নির্বাচন করুন",
    },
    marital_status: {
      title: "বৈবাহিক অবস্থা",
      triggerText: "আপনার বৈবাহিক অবস্থা নির্বাচন করুন",
    },
    birth_date: {
      title: "জন্ম তারিখ",
      placeholder: "আপনার জন্ম তারিখ নির্ধারণ করুন",
    },
    height: {
      title: "উচ্চতা",
      triggerText: "আপনার উচ্চতা নির্বাচন করুন",
    },
    weight: {
      title: "ওজন",
      triggerText: "আপনার ওজন নির্বাচন করুন",
    },
    complexion: {
      title: "গাত্রবর্ণ",
      triggerText: "আপনার গাত্রবর্ণ নির্বাচন করুন",
    },
    blood_group: {
      title: "রক্তের গ্রুপ",
      triggerText: "আপনার রক্তের গ্রুপ নির্বাচন করুন",
    },
    language_skills: {
      title: "ভাষাগত দক্ষতা",
      placeholder: "উদাহরণ: বাংলা, ইংরেজি, আরবি",
    },
    location: {
      hintText: "ঠিকানা নির্বাচন করুন",
      triggerText: "আপনার ঠিকানা নির্বাচন করুন",
      label: "ঠিকানা নির্বাচন করুন",
    },
  },

  unKnownError: {
    title: "একটি সমস্যা হয়েছে!",
    description:
      "দয়া করে সাপোর্ট টিমের সাথে যোগাযোগ করুন এবং সমস্যার বিস্তারিত জানিয়ে সাহায্য নিন।",
  },
};

// Validation Messages
export const VM = {
  birth_date: {
    required: "অনুগ্রহ করে আপনার জন্ম তারিখ নির্ধারণ করুন।",
    maxLength: "জন্ম তারিখ সঠিকভাবে দিন।",
  },
  gender: {
    required: "অনুগ্রহ করে আপনার লিঙ্গ নির্বাচন করুন।",
  },
  marital_status: {
    required: "অনুগ্রহ করে আপনার বৈবাহিক অবস্থা নির্বাচন করুন।",
  },
  height: {
    required: "অনুগ্রহ করে আপনার উচ্চতা নির্বাচন করুন।",
  },
  weight: {
    required: "অনুগ্রহ করে আপনার ওজন নির্বাচন করুন।",
  },
  complexion: {
    required: "অনুগ্রহ করে আপনার গাত্রবর্ণ নির্বাচন করুন।",
  },
  blood_group: {
    required: "অনুগ্রহ করে আপনার রক্তের গ্রুপ নির্বাচন করুন।",
  },
  language_skills: {
    maxLength: "ভাষাগত দক্ষতা সর্বাধিক ১০০ অক্ষর হতে পারে।",
  },
  location: {
    required: "অনুগ্রহ করে আপনার ঠিকানা নির্বাচন করুন।",
  },
};
