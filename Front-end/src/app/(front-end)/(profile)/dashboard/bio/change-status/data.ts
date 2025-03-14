import Routes from "@/assets/data/routes";

export const Data = {
  title: "বায়ো স্ট্যাটাস পরিবর্তন",
  submit: "আপডেট করুন",

  success: {
    title: "বায়ো স্ট্যাটাস সফলভাবে আপডেট হয়েছে",
    description:
      "আপনার বায়ো স্ট্যাটাস সফলভাবে আপডেট হয়েছে। প্রয়োজনে অন্যান্য তথ্য আপডেট করুন।",
    redirectUrl: Routes.profile_bio.url,
  },
  error: {
    title: "বায়ো স্ট্যাটাস আপডেট করা সম্ভব হয়নি",
    description:
      "আপনার বায়ো স্ট্যাটাস আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    tryAgainDescription: "দয়া করে সংশোধনী মেনে পুনরায় চেষ্টা করুন।",
    422: {
      title: "বায়ো স্ট্যাটাস সঠিকভাবে পূর্ণ করা হয়নি",
      description:
        "আপনার বায়ো স্ট্যাটাস সঠিকভাবে আপডেট করা সম্ভব হয়নি। দয়া করে যাচাই করুন এবং পুনরায় চেষ্টা করুন।",
    },
  },

  wait: "অপেক্ষা করুন...",
  inputs: {
    status: {
      title: "বায়ো স্ট্যাটাস",
      triggerText: "আপনার বায়ো স্ট্যাটাস নির্বাচন করুন",
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
  status: {
    required: "বায়ো স্ট্যাটাস নির্বাচন করা আবশ্যক।",
  },
};
