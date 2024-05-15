export const formData = {
  inputs: {
    name: {
      title: "আপনার নাম",
      placeholder: "মোহাম্মদ ইসমাইল হোসেন",
    },
    email: {
      title: "আপনার ইমেইল",
      placeholder: "you@gmail.com",
    },
    phone: {
      title: "মোবাইল নম্বর",
      placeholder: "01......... ,  01.........",
    },
    password: {
      title: "পাসওয়ার্ড",
      placeholder: "********",
      forget: "পাসওয়ার্ড মনে নেই?",
      forgetLink: "/forget-password",
    },
    password_confirmation: {
      title: "পাসওয়ার্ড নিশ্চিত করুন",
      placeholder: "********",
    },
  },
  register: {
    title: "রেজিস্ট্রেশন",
    submit: "রেজিস্ট্রেশন সম্পন্ন করুন",

    success: {
      title: "একাউন্ট সফলভাবে খোলা হয়েছে।",
      description:
        "আপনার একাউন্ট সফলভাবে খোলা হয়েছে। অনুগ্রহ করে Dashboard এ যান। ",
      redirectUrl: "/mail-verification",
    },
    error: {
      title: "একাউন্ট খোলা সম্ভব হয়নি।",
      description:
        "আপনার একাউন্ট খোলা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
  },
  login: {
    title: "লগিন",
    success: {
      title: "একাউন্ট লগিন সফল হয়েছে।",
      description: "অনুগ্রহ করে Dashboard এ যান।",
      redirectUrl: "/dashboard",
    },
    error: {
      title: "একাউন্ট লগিন সফল হয়নি।",
      description: "অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
    submit: "লগিন সম্পন্ন করুন",
  },
  forgetPassword: {
    title: "পাসওয়ার্ড ভূল ",
    submit: "পাসওয়ার্ড রিসেট লিংক পাঠান",
  },
  resetPassword: {
    title: "পাসওয়ার্ড পরিবর্তন করুন",
    successRedirectUrl: "",
    submit: "পাসওয়ার্ড পরিবর্তন করুন",
  },
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
