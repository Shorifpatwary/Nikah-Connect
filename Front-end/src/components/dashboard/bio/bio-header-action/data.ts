import Routes from "@/assets/data/routes";

export const Data = {
  title: "বায়োডাটা সংক্রান্ত তথ্য",
  editShortBio: {
    label: "বায়োডাটা সংশোধন করুন",
    url: Routes.profile_bio.short_bio.edit,
  },
  changeStatus: {
    label: "স্ট্যাটাস পরিবর্তন ",
    url: Routes.profile_bio.change_status,
  },
  approveRequestShortBio: {
    label: "বায়োডাটা এপ্রুভ রিকোয়েষ্ট পাঠান",
  },
  bio: {
    approveRequest: {
      success: {
        title: "বায়ো এপ্রুব রিকোয়েষ্ট সফলভাবে পাঠানো হয়েছে।",
        description: "আপনার বায়োডাটা সফলভাবে এপ্রুভ রিকোয়েষ্টে পাঠানো হয়েছে।",
        redirectUrl: Routes.profile_bio.url,
      },
      unKnownError: {
        title: "অজানা ত্রুটি",
        description: "কিছু সমস্যা ঘটেছে। দয়া করে আবার চেষ্টা করুন।",
      },
    },
  },
};
