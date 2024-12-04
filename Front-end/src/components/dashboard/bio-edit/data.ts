import Routes from "@/assets/data/routes";
const profileBio = Routes.profile_bio;
export const BioEditData = {
  initialText: "আপনি ইতোপূর্বে কোন বায়োডাটা ক্রিয়েট করেন নাই।",
  general: {
    label: "সাধারন তথ্য",
    create: {
      link: profileBio.general.create,
      label: "বায়োডাটা তৈরী করুন। (সাধারন তথ্য - ১/১০)",
    },
    edit: {
      link: profileBio.general.edit,
      label: "সাধারন তথ্য সংশোধন করুন।",
    },
  },
  location: {
    label: "লোকেশন",
    create: {
      link: profileBio.location.create,
      label: "বায়োডাটা তৈরী করুন। (লোকেশন - ২/১০)",
    },
    edit: {
      link: profileBio.location.edit,
      label: "লোকেশন সংশোধন করুন।",
    },
  },
  education: {
    label: "শিক্ষা",
    create: {
      link: profileBio.education.create,
      label: "বায়োডাটা তৈরী করুন। (শিক্ষা - ৩/১০)",
    },
    edit: {
      link: profileBio.education.edit,
      label: "শিক্ষা সংশোধন করুন।",
    },
  },
  personal_info: {
    label: "ব্যাক্তিগত তথ্য",
    create: {
      link: profileBio.personal_info.create,
      label: "বায়োডাটা তৈরী করুন। (ব্যাক্তিগত তথ্য - ৪/১০)",
    },
    edit: {
      link: profileBio.personal_info.edit,
      label: "ব্যাক্তিগত তথ্য সংশোধন করুন।",
    },
  },
  family: {
    label: "পারিবারিক তথ্য",
    create: {
      link: profileBio.family.create,
      label: "বায়োডাটা তৈরী করুন। (পারিবারিক তথ্য - ৫/১০)",
    },
    edit: {
      link: profileBio.family.edit,
      label: "পারিবারিক তথ্য সংশোধন করুন।",
    },
  },
  profession: {
    label: "পেশা",
    create: {
      link: profileBio.profession.create,
      label: "বায়োডাটা তৈরী করুন। (পেশা - ৬/১০)",
    },
    edit: {
      link: profileBio.profession.edit,
      label: "পেশা সংশোধন করুন।",
    },
  },
  religious: {
    label: "ধর্ম",
    create: {
      link: profileBio.religious_activities.create,
      label: "বায়োডাটা তৈরী করুন। (ধর্ম - ৭/১০)",
    },
    edit: {
      link: profileBio.religious_activities.edit,
      label: "ধর্ম সংশোধন করুন।",
    },
  },
  marital: {
    label: "বৈবাহিক তথ্য",
    create: {
      link: profileBio.marital_info.create,
      label: "বায়োডাটা তৈরী করুন। (বৈবাহিক তথ্য - ৮/১০)",
    },
    edit: {
      link: profileBio.marital_info.edit,
      label: "বৈবাহিক তথ্য সংশোধন করুন।",
    },
  },
  expected_partner: {
    label: "প্রত্যাশিত জীবনসঙ্গী",
    create: {
      link: profileBio.expected_partner.create,
      label: "বায়োডাটা তৈরী করুন। (প্রত্যাশিত জীবনসঙ্গী - ৯/১০)",
    },
    edit: {
      link: profileBio.expected_partner.edit,
      label: "প্রত্যাশিত জীবনসঙ্গী সংশোধন করুন।",
    },
  },
  hidden: {
    label: "গোপনীয় তথ্য",
    create: {
      link: profileBio.hidden_info.create,
      label: "বায়োডাটা তৈরী করুন। (গোপনীয় তথ্য - ১০/১০)",
    },
    edit: {
      link: profileBio.hidden_info.edit,
      label: "গোপনীয় তথ্য সংশোধন করুন।",
    },
  },
};
