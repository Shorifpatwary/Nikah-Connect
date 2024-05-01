export const RegisterData = {
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
    },
    password_confirmation: {
      title: "পাসওয়ার্ড নিশ্চিত করুন",
      placeholder: "********",
    },
  },
  successRedirectUrl: "verify-email",
  submit: "রেজিস্ট্রেশন সম্পন্ন করুন",
};
// RegisterValidationMassage
export const RVMassage = {
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
