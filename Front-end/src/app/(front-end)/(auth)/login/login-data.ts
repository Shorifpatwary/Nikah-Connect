export const LoginData = {
  title: "রেজিস্ট্রেশন",
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
  successRedirectUrl: "/dashboard",
  submit: "লগইন সম্পন্ন করুন",
};

// login Validation Message
export const LVMassage = {
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
};
