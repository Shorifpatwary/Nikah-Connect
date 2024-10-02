import Routes from "@/assets/data/routes";

export const Data = {
  title: "সাধারন তথ্য",
  submit: "জমা দিন",
  wait: "অপেক্ষা করুন",

  success: {
    title: "বায়ো ডাটার সাধারন তথ্য সফলভাবে খোলা হয়েছে।",
    description:
      "আপনার বায়ো ডাটার সাধারন তথ্য সফলভাবে খোলা হয়েছে। অনুগ্রহ করে, পরবর্তি ধাপ এর তথ্যগুলো পূরণ করুন।",
    redirectUrl: Routes.profile_bio.location.create,
  },
  error: {
    title: "বায়ো ডাটার সাধারন তথ্য খোলা সম্ভব হয়নি।",
    description:
      "আপনার বায়ো ডাটার সাধারন তথ্য খোলা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    403: {
      title: "আপনি ইতোপূর্বে বায়ো ডাটা তৈরী করেছেন।",
      description: "দয়া করে পূর্বের তৈরী করা বায়ো ডাটাটি ইডিট করুন।",
    },
    422: {
      title: "সাধারন তথ্যসমূহ সঠিকভাবে পূরন করা হয়নি।",
      description:
        "আপনার বায়ো ডাটার সাধারন তথ্য খোলা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
  },
  inputs: {
    gender: {
      title: "বায়োডাটার ধরন।",
      triggerText: "আপনার জেন্ডার সিলেক্ট করুন।",
    },
    marital_status: {
      title: "বৈবাহিক অবস্থা।",
      triggerText: "আপনার বৈবাহিক অবস্থা সিলেক্ট করুন।",
    },
    birth_date: {
      title: "আপনার জন্মসাল নির্ধারন করুন।",
      placeholder: "example@gmail.com",
    },
    height: {
      title: "আপনার উচ্চতা।",
      triggerText: "আপনার উচ্চতা সিলেক্ট করুন।",
    },
    weight: {
      title: "আপনার ওজন।",
      triggerText: "আপনার ওজন সিলেক্ট করুন।",
    },
    complexion: {
      title: "আপনার গাত্রবর্ণ।",
      triggerText: "আপনার গাত্রবর্ণ সিলেক্ট করুন।",
    },
    blood_group: {
      title: "রক্তের গ্রুপ।",
      triggerText: "আপনার রক্তের গ্রুপ সিলেক্ট করুন।",
    },
    language_skills: {
      title: "কোন কোন ভাষায় আপনার দক্ষতা রয়েছে?",
      placeholder: "বাংলা, ইংরেজি, আরাবিক",
    },
    location: {
      hintText: "ঠিকানা সিলেক্ট করুন।",
      triggerText: "ঠিকানা সিলেক্ট করুন।",
      label: "আপনার ঠিকানা সিলেক্ট করুন।",
    },
  },

  unKnownError: {
    title: "কিছুটা সমস্যা হয়েছে!",
    description:
      "কর্তৃপক্ষের সাথে সাপোর্ট এর মাধ্যমে যোগাযোগ করুন। এবং আপনার সমস্যার বিষয়টি তাদেরকে জানান। ",
  },
};
// Validation Massage
export const VM = {
  birth_date: {
    required: "অনুগ্রহ করে আপনার জন্ম তারিখ নির্ধারন করুন।",
    maxLength: "অনুগ্রহ করে সঠিক জন্ম তারিখ নির্ধারন করুন।",
  },
  gender: {
    required: "অনুগ্রহ করে আপনার বায়োডাটার ধরন সিলেক্ট করুন।",
  },
  marital_status: {
    required: "অনুগ্রহ করে আপনার বৈবাহিক অবস্থা সিলেক্ট করুন।",
  },
  height: {
    required: "অনুগ্রহ করে আপনার উচ্চতা সিলেক্ট করুন।",
  },
  weight: {
    required: "অনুগ্রহ করে আপনার ওজন সিলেক্ট করুন।",
  },
  complexion: {
    required: "অনুগ্রহ করে আপনার গাত্রবর্ণ সিলেক্ট করুন।",
  },
  blood_group: {
    required: "অনুগ্রহ করে আপনার রক্তের গ্রুপ সিলেক্ট করুন।",
  },
  language_skills: {
    maxLength: "ভাষাগত দক্ষতা অবশ্যই ১০০ অক্ষরের মধ্যে হতে হবে।",
  },
  location: {
    require: "অনুগ্রহ করে আপনার ঠিকানা সিলেক্ট করুন।",
  },
};
