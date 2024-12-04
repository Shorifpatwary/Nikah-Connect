import Routes from "@/assets/data/routes";

export const Data = {
  title: "ধর্মীয় কার্যকলাপ",
  submit: "আপডেট করুন",
  wait: "অপেক্ষা করুন...",

  success: {
    title: "ধর্মীয় কার্যকলাপের তথ্য সফলভাবে আপডেট হয়েছে",
    description:
      "আপনার ধর্মীয় কার্যকলাপের তথ্য সফলভাবে আপডেট হয়েছে। প্রয়োজন অনুযায়ী অন্য তথ্য আপডেট করুন।",
    redirectUrl: Routes.Profile,
  },
  error: {
    title: "ধর্মীয় কার্যকলাপের তথ্য আপডেট করা সম্ভব হয়নি",
    description:
      "আপনার ধর্মীয় কার্যকলাপের তথ্য আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    tryAgainDescription: "দয়া করে সংশোধনী মেনে পুনরায় চেষ্টা করুন।",
    422: {
      title: "ধর্মীয় কার্যকলাপের তথ্য সঠিকভাবে পূর্ণ করা হয়নি",
      description:
        "আপনার ধর্মীয় কার্যকলাপের তথ্য সঠিকভাবে আপডেট করা সম্ভব হয়নি। দয়া করে যাচাই করুন এবং পুনরায় চেষ্টা করুন।",
    },
  },

  inputs: {
    prayer_habits: {
      title: "নামাজের অভ্যাস",
      placeholder: "আপনার নামাজের অভ্যাস সম্পর্কে লিখুন",
      suggestions: [
        "প্রতিদিন ৫ ওয়াক্ত নামাজ পড়েন কি? বিস্তারিত লিখুন।",
        "আপনি সপ্তাহে কত ওয়াক্ত নামাজ কাজা করেন? বিস্তারিত লিখুন।",
        "কোনো বিশেষ নামাজের অভ্যাস থাকলে তা উল্লেখ করুন।",
      ],
    },
    haram_relationships: {
      title: "হারাম সম্পর্ক",
      placeholder: "আপনার হারাম সম্পর্কের সাথে সম্পর্কিত হলে, উল্লেখ করুন",
      suggestions: [
        "বর্তমানে বা পূর্বে কোনো ধরনের হারাম সম্পর্কের সাথে জড়িত ছিলেন কি? বিস্তারিত লিখুন।",
      ],
    },
    quran_recitation: {
      title: "কুরআন তেলাওয়াত",
      placeholder: "আপনার কুরআন তেলাওয়াতের অভ্যাস সম্পর্কে লিখুন",
      suggestions: [
        "শুদ্ধভাবে কুরআন তেলাওয়াত করতে পারেন? বছরে কতবার কোরআন মাজীদ খতম করেন? বিস্তারিত লিখুন।",
        "আপনি কখন এবং কিভাবে কুরআন তেলাওয়াত শিক্ষা করেছেন? বিস্তারিত লিখুন।",
      ],
    },
    mahram_adherence: {
      title: "মাহরাম পালনে নিষ্ঠা",
      placeholder: "মাহরাম / নন-মাহরাম মেনে চলেন?",
      suggestions: [
        "আপনি মাহরাম / নন-মাহরাম মেনে চলেন কিনা? কতটুকু মেনে চলেন? বিস্তারিত লিখুন।",
      ],
    },
    has_beard: {
      title: "দাড়ি রাখা",
      placeholder: "আপনি কি দাড়ি রাখেন?",
      suggestions: ["আপনার দাড়ি কি সুন্নত মেনে রাখা হয়েছে? উল্লেখ করুন।"],
    },
    entertainment_habits: {
      title: "বিনোদনের অভ্যাস",
      placeholder: "আপনার বিনোদনের অভ্যাস সম্পর্কে লিখুন",
      suggestions: [
        "আপনি কী ধরনের বিনোদনমূলক কার্যকলাপে অংশগ্রহণ করেন তা উল্লেখ করুন।",
        "নাটক / সিনেমা / সিরিয়াল / গান / খেলা এসব দেখেন বা শুনেন? বিস্তারিত লিখুন।",
      ],
    },
    mazhab: {
      title: "মাযহাব",
      triggerText: "আপনার মাযহাব নির্বাচন করুন",
    },
    religious_beliefs: {
      title: "ধর্মীয় বিশ্বাস",
      placeholder: "আপনার ধর্মীয় বিশ্বাস সম্পর্কিত বর্ণনা দিন",
      suggestions: [
        "ধর্মীয় বিষয়ে আপনার আকিদা বা বিশ্বাস সম্পর্কে বিস্তারিত লিখুন।",
        "কাদিয়ানিদের বিষয়ে আপনি কী বিশ্বাস রাখেন?",
        "মাজার সম্পর্কে আপনার কী ধারণা? বিস্তারিত লিখুন।",
      ],
    },
    religious_knowledge: {
      title: "ধর্মীয় জ্ঞান",
      placeholder: "আপনার ধর্মীয় জ্ঞান সম্পর্কে লিখুন",
      suggestions: [
        "ধর্মীয় বিষয়ে আপনার জ্ঞান বা অর্জিত শিক্ষার কথা উল্লেখ করুন।",
        "কোনো নির্দিষ্ট ধর্মীয় শাস্ত্র বা বিষয়ের উপর জ্ঞান থাকলে তা উল্লেখ করুন।",
      ],
    },
    family_religious_environment: {
      title: "পারিবারিক ধর্মীয় পরিবেশ",
      placeholder: "আপনার পারিবারিক ধর্মীয় পরিবেশ সম্পর্কে লিখুন",
      suggestions: ["পরিবারে ধর্মের প্রভাব সম্পর্কে লিখুন।"],
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
  prayer_habits: {
    required: "নামাজের অভ্যাস সম্পর্কিত তথ্য প্রদান করা আবশ্যক।",
    minLength: "নামাজের অভ্যাস সম্পর্কিত তথ্য সর্বনিম্ন ১০ অক্ষর হতে হবে।",
    maxLength: "নামাজের অভ্যাস সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  haram_relationships: {
    maxLength: "হারাম সম্পর্ক সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  quran_recitation: {
    maxLength: "কুরআন তেলাওয়াতের তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  mahram_adherence: {
    maxLength: "মাহরাম পালনের তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  has_beard: {
    maxLength: "দাড়ি সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  entertainment_habits: {
    maxLength: "বিনোদনের অভ্যাসের তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  mazhab: {
    required: "মাযহাব নির্বাচন করা আবশ্যক।",
  },
  religious_beliefs: {
    maxLength: "ধর্মীয় বিশ্বাস সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  religious_knowledge: {
    maxLength: "ধর্মীয় জ্ঞান সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
  family_religious_environment: {
    maxLength:
      "পারিবারিক ধর্মীয় পরিবেশ সম্পর্কিত তথ্য সর্বাধিক ১০০০ অক্ষর হতে পারবে।",
  },
};
