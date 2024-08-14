import Routes from "@/assets/data/routes";

export const formData = {
  inputs: {
    name: {
      title: "আপনার নাম",
      placeholder: "মোহাম্মদ ইসমাইল হোসেন",
    },
    email: {
      title: "আপনার ইমেইল",
      placeholder: "example@gmail.com",
    },
    phone: {
      title: "মোবাইল নম্বর",
      placeholder: "01.........",
    },
    password: {
      title: "পাসওয়ার্ড",
      placeholder: "********",
      forget: "পাসওয়ার্ড মনে নেই?",
      forgetLink: Routes.ForgetPassword,
    },
    newPassword: {
      title: "নতুন পাসওয়ার্ড",
    },
    password_confirmation: {
      title: "পাসওয়ার্ড নিশ্চিত করুন",
      placeholder: "********",
    },
  },
  register: {
    title: "রেজিস্ট্রেশন",
    submit: "রেজিস্ট্রেশন সম্পন্ন করুন",
    wait: "অপেক্ষা করুন",

    success: {
      title: "একাউন্ট সফলভাবে খোলা হয়েছে।",
      description:
        "আপনার একাউন্ট সফলভাবে খোলা হয়েছে। অনুগ্রহ করে, আপনার দেওয়া ই-মেইল টি ভেরিফিকেশন করুন। ",
      redirectUrl: Routes.MailVerification,
    },
    error: {
      title: "একাউন্ট খোলা সম্ভব হয়নি।",
      description:
        "আপনার একাউন্ট খোলা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
  },
  login: {
    title: "লগিন",
    submit: "লগিন সম্পন্ন করুন",
    wait: "অপেক্ষা করুন",
    success: {
      title: "একাউন্ট লগিন সফল হয়েছে।",
      description: "একাউন্ট লগিন সফল হয়েছে। অনুগ্রহ করে, Dashboard এ যান।",
      redirectUrl: Routes.Profile,
    },
    error: {
      title: "একাউন্ট লগিন সফল হয়নি।",
      description: "অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
  },
  unKnownError: {
    title: "কিছুটা সমস্যা হয়েছে!",
    description:
      "কর্তৃপক্ষের সাথে সাপোর্ট এর মাধ্যমে যোগাযোগ করুন। এবং আপনার সমস্যার বিষয়টি তাদেরকে জানান। ",
  },
  forgetPassword: {
    title: "পাসওয়ার্ড ভূলে গেছেন?",
    submit: "পাসওয়ার্ড রিসেট লিংক পাঠান",
    wait: "অপেক্ষা করুন",
    success: {
      title: "পাসওয়ার্ড রিসেট লিংক সফলভাবে পাঠানো হয়েছে।",
      description:
        "আপনার ই-মেইল এ পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। দয়া করে উক্ত লিংক এ ক্লিক করে আপনার পাসওয়ার্ড পরিবর্তন করুন।",
    },
    error: {
      title: "পাসওয়ার্ড রিসেট লিংক পাঠানো সম্ভব হয়নি।",
      description:
        "পাসওয়ার্ড রিসেট লিংক পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
  },
  resetPassword: {
    title: "পাসওয়ার্ড পরিবর্তন করুন",
    submit: "পাসওয়ার্ড পরিবর্তন করুন",
    success: {
      title: "সফলভাবে আপনার পাসওয়ার্ড পরিবর্তন করা হয়েছে।",
      description:
        "আপনার পাসওয়ার্ড পরিবর্তন করা হয়েছে। অনুগ্রহ করে Login পেজ হতে লগিন করার চেষ্টা করুন।",
      redirectUrl: Routes.Login,
    },
    error: {
      title: "পসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি।",
      description:
        "পসওয়ার্ড পরিবর্তন করা সফল হয়নি। অনুগ্রহ করে, Forget Password পেজ এ গিয়ে আবার চেষ্টা করুন।",
    },
    wrongUrl: {
      title: "ভূল URL প্রদান করা হয়েছে।",
      description:
        "আপনার দেওয়া URL টিতে ভূল রয়েছে। অনুগ্রহ করে, ই-মেইল এ দেওয়া লিংক এ ক্লিক করে আবার চেষ্টা করুন। আর যদি আপনার ই-মেইল এ লিংক না পেয়ে থাকেন, তাহলে পুনরায় রিসেট লিংক পাঠান। ",
      redirectUrl: Routes.ForgetPassword,
    },
  },
  wait: "অপেক্ষা করুন",
};
// ValidationMassage
export const ValidationMassage = {
  name: {
    required: "অনুগ্রহ করে আপনার নাম টাইপ করুন।",
    minLength: "আপনার নাম অনেক ছোট।",
    maxLength: "আপনার নাম অনেক বড়।",
  },
  email: {
    required: "অনুগ্রহ করে আপনার ই-মেইল টাইপ করুন।",
    minLength: "আপনার ই-মেইল অনেক ছোট।",
    email: "এই ঘরে ই-মেইল প্রদান করুন।",
    maxLength: "আপনার ই-মেইল অনেক বড়।",
  },
  password: {
    required: "অনুগ্রহ করে আপনার পাসওয়ার্ড টাইপ করুন।",
    minLength: "আপনার পাসওয়ার্ড অনেক ছোট।",
    maxLength: "আপনার পাসওয়ার্ড অনেক বড়।",
  },
  password_confirmation: {
    required: "অনুগ্রহ করে আপনার পাসওয়ার্ড পুনরায় টাইপ করুন।",
    confirm: "দুটি পাসওয়ার্ড মিলে নাই।",
  },
  phone: {
    maxLength: "আপনার মোবাইল নম্বর অনেক বড়।",
  },
};
