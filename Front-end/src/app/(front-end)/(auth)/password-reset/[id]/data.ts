export const RsData = {
  title: "পাসওয়ার্ড পরিবর্তন করুন",
  inputs: {
    password: {
      title: "পাসওয়ার্ড",
      placeholder: "********",
    },
    password_confirmation: {
      title: "পাসওয়ার্ড নিশ্চিত করুন",
      placeholder: "********",
    },
  },
  submit: "পাসওয়ার্ড রিসেট লিংক পাঠান",
};

// Reset Validation Message
export const RsVMassage = {
  password: {
    required: "অনুগ্রহ করে আপনার পাসওয়ার্ড টাইপ করুন।",
    minLength: "আপনার পাসওয়ার্ড অনেক ছোট।",
    maxLength: "আপনার পাসওয়ার্ড অনেক বড়।",
  },
  password_confirmation: {
    required: "অনুগ্রহ করে আপনার পাসওয়ার্ড পুনরায় টাইপ করুন।",
    confirm: "দুটি পাসওয়ার্ড মিলে নাই।",
  },
};
