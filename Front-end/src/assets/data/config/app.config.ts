import { Option } from "@/components/blocks/inputBox/selectBox";

export const backendUrl = "http://localhost:8000";
export const frontEndUrl = "http://localhost:3000";

export const appNameEn = "connect nikah";
export const appNameBn = "কানেক্ট নিকাহ";

export const userCookieName = "authUser";

export const x_xsrf_token = "XSRF-TOKEN";
export const connect_nikah_session = "connect_nikah_session";

export const userAuthCookies = [userCookieName];

// contact

export const supportEmail = "support@connectnikah.com";

// cache
export const allUsersTag = "users";
export const allUsersInfoTag = "users_info";
export const allLocations = "locations";
export const allTag = "tags";
export const allBio = "bios";
export const generals = "generals";
export const locations = "locations";
export const educations = "educations";
export const personalDetails = "personalDetails";
export const familyInfos = "familyInfos";
export const filledMarks = "filled_marks";
export const professionInfo = "professionInfo";
export const religiousActivities = "religiousActivities";

// ! user  roles from "RolesEnum.php"
export const roles: Option[] = [
  { value: "user", title: "user" },
  { value: "admin", title: "admin" },
  { value: "super-admin", title: "super admin" },
  { value: "editor", title: "editor" },
  { value: "writer", title: "writer" },
];

export const genders: Option[] = [
  { value: "পাত্র", title: "পাত্র" },
  { value: "পাত্রী", title: "পাত্রী" },
];

export const marital_status: Option[] = [
  { value: "অবিবাহিত", title: "অবিবাহিত" },
  { value: "বিবাহিত", title: "বিবাহিত" },
  { value: "ডিভোর্সড", title: "ডিভোর্সড" },
  { value: "বিধবা", title: "বিধবা" },
  { value: "বিপত্নিক", title: "বিপত্নিক" },
];

export const heights: Option[] = [
  { value: "3.0", title: "৩.০ ফিট" },
  { value: "3.1", title: "৩.১ ফিট" },
  { value: "3.2", title: "৩.২ ফিট" },
  { value: "3.3", title: "৩.৩ ফিট" },
  { value: "3.4", title: "৩.৪ ফিট" },
  { value: "3.5", title: "৩.৫ ফিট" },
  { value: "3.6", title: "৩.৬ ফিট" },
  { value: "3.7", title: "৩.৭ ফিট" },
  { value: "3.8", title: "৩.৮ ফিট" },
  { value: "3.9", title: "৩.৯ ফিট" },
  { value: "3.10", title: "৩.১০ ফিট" },
  { value: "3.11", title: "৩.১১ ফিট" },

  { value: "4.0", title: "৪.০ ফিট" },
  { value: "4.1", title: "৪.১ ফিট" },
  { value: "4.2", title: "৪.২ ফিট" },
  { value: "4.3", title: "৪.৩ ফিট" },
  { value: "4.4", title: "৪.৪ ফিট" },
  { value: "4.5", title: "৪.৫ ফিট" },
  { value: "4.6", title: "৪.৬ ফিট" },
  { value: "4.7", title: "৪.৭ ফিট" },
  { value: "4.8", title: "৪.৮ ফিট" },
  { value: "4.9", title: "৪.৯ ফিট" },
  { value: "4.10", title: "৪.১০ ফিট" },
  { value: "4.11", title: "৪.১১ ফিট" },

  { value: "5.0", title: "৫.০ ফিট" },
  { value: "5.1", title: "৫.১ ফিট" },
  { value: "5.2", title: "৫.২ ফিট" },
  { value: "5.3", title: "৫.৩ ফিট" },
  { value: "5.4", title: "৫.৪ ফিট" },
  { value: "5.5", title: "৫.৫ ফিট" },
  { value: "5.6", title: "৫.৬ ফিট" },
  { value: "5.7", title: "৫.৭ ফিট" },
  { value: "5.8", title: "৫.৮ ফিট" },
  { value: "5.9", title: "৫.৯ ফিট" },
  { value: "5.10", title: "৫.১০ ফিট" },
  { value: "5.11", title: "৫.১১ ফিট" },

  { value: "6.0", title: "৬.০ ফিট" },
  { value: "6.1", title: "৬.১ ফিট" },
  { value: "6.2", title: "৬.২ ফিট" },
  { value: "6.3", title: "৬.৩ ফিট" },
  { value: "6.4", title: "৬.৪ ফিট" },
  { value: "6.5", title: "৬.৫ ফিট" },
  { value: "6.6", title: "৬.৬ ফিট" },
  { value: "6.7", title: "৬.৭ ফিট" },
  { value: "6.8", title: "৬.৮ ফিট" },
  { value: "6.9", title: "৬.৯ ফিট" },
  { value: "6.10", title: "৬.১০ ফিট" },
  { value: "6.11", title: "৬.১১ ফিট" },

  { value: "7.0", title: "৭.০ ফিট" },
  { value: "7.1", title: "৭.১ ফিট" },
  { value: "7.2", title: "৭.২ ফিট" },
  { value: "7.3", title: "৭.৩ ফিট" },
  { value: "7.4", title: "৭.৪ ফিট" },
  { value: "7.5", title: "৭.৫ ফিট" },
  { value: "7.6", title: "৭.৬ ফিট" },
  { value: "7.7", title: "৭.৭ ফিট" },
  { value: "7.8", title: "৭.৮ ফিট" },
  { value: "7.9", title: "৭.৯ ফিট" },
  { value: "7.10", title: "৭.১০ ফিট" },
  { value: "7.11", title: "৭.১১ ফিট" },
];

export const weights: Option[] = [
  { value: "20", title: "২০ কেজি" },
  { value: "21", title: "২১ কেজি" },
  { value: "22", title: "২২ কেজি" },
  { value: "23", title: "২৩ কেজি" },
  { value: "24", title: "২৪ কেজি" },
  { value: "25", title: "২৫ কেজি" },
  { value: "26", title: "২৬ কেজি" },
  { value: "27", title: "২৭ কেজি" },
  { value: "28", title: "২৮ কেজি" },
  { value: "29", title: "২৯ কেজি" },

  { value: "30", title: "৩০ কেজি" },
  { value: "31", title: "৩১ কেজি" },
  { value: "32", title: "৩২ কেজি" },
  { value: "33", title: "৩৩ কেজি" },
  { value: "34", title: "৩৪ কেজি" },
  { value: "35", title: "৩৫ কেজি" },
  { value: "36", title: "৩৬ কেজি" },
  { value: "37", title: "৩৭ কেজি" },
  { value: "38", title: "৩৮ কেজি" },
  { value: "39", title: "৩৯ কেজি" },

  { value: "40", title: "৪০ কেজি" },
  { value: "41", title: "৪১ কেজি" },
  { value: "42", title: "৪২ কেজি" },
  { value: "43", title: "৪৩ কেজি" },
  { value: "44", title: "৪৪ কেজি" },
  { value: "45", title: "৪৫ কেজি" },
  { value: "46", title: "৪৬ কেজি" },
  { value: "47", title: "৪৭ কেজি" },
  { value: "48", title: "৪৮ কেজি" },
  { value: "49", title: "৪৯ কেজি" },

  { value: "50", title: "৫০ কেজি" },
  { value: "51", title: "৫১ কেজি" },
  { value: "52", title: "৫২ কেজি" },
  { value: "53", title: "৫৩ কেজি" },
  { value: "54", title: "৫৪ কেজি" },
  { value: "55", title: "৫৫ কেজি" },
  { value: "56", title: "৫৬ কেজি" },
  { value: "57", title: "৫৭ কেজি" },
  { value: "58", title: "৫৮ কেজি" },
  { value: "59", title: "৫৯ কেজি" },

  { value: "60", title: "৬০ কেজি" },
  { value: "61", title: "৬১ কেজি" },
  { value: "62", title: "৬২ কেজি" },
  { value: "63", title: "৬৩ কেজি" },
  { value: "64", title: "৬৪ কেজি" },
  { value: "65", title: "৬৫ কেজি" },
  { value: "66", title: "৬৬ কেজি" },
  { value: "67", title: "৬৭ কেজি" },
  { value: "68", title: "৬৮ কেজি" },
  { value: "69", title: "৬৯ কেজি" },

  { value: "70", title: "৭০ কেজি" },
  { value: "71", title: "৭১ কেজি" },
  { value: "72", title: "৭২ কেজি" },
  { value: "73", title: "৭৩ কেজি" },
  { value: "74", title: "৭৪ কেজি" },
  { value: "75", title: "৭৫ কেজি" },
  { value: "76", title: "৭৬ কেজি" },
  { value: "77", title: "৭৭ কেজি" },
  { value: "78", title: "৭৮ কেজি" },
  { value: "79", title: "৭৯ কেজি" },

  { value: "80", title: "৮০ কেজি" },
  { value: "81", title: "৮১ কেজি" },
  { value: "82", title: "৮২ কেজি" },
  { value: "83", title: "৮৩ কেজি" },
  { value: "84", title: "৮৪ কেজি" },
  { value: "85", title: "৮৫ কেজি" },
  { value: "86", title: "৮৬ কেজি" },
  { value: "87", title: "৮৭ কেজি" },
  { value: "88", title: "৮৮ কেজি" },
  { value: "89", title: "৮৯ কেজি" },

  { value: "90", title: "৯০ কেজি" },
  { value: "91", title: "৯১ কেজি" },
  { value: "92", title: "৯২ কেজি" },
  { value: "93", title: "৯৩ কেজি" },
  { value: "94", title: "৯৪ কেজি" },
  { value: "95", title: "৯৫ কেজি" },
  { value: "96", title: "৯৬ কেজি" },
  { value: "97", title: "৯৭ কেজি" },
  { value: "98", title: "৯৮ কেজি" },
  { value: "99", title: "৯৯ কেজি" },

  { value: "100", title: "১০০ কেজি" },
  { value: "105", title: "১০৫ কেজি" },
  { value: "110", title: "১১০ কেজি" },
  { value: "115", title: "১১৫ কেজি" },
  { value: "120", title: "১২০ কেজি" },
  { value: "125", title: "১২৫ কেজি" },
  { value: "130", title: "১৩০ কেজি" },
  { value: "135", title: "১৩৫ কেজি" },
  { value: "140", title: "১৪০ কেজি" },
  { value: "145", title: "১৪৫ কেজি" },
  { value: "150", title: "১৫০ কেজি" },

  { value: "160", title: "১৬০ কেজি" },
  { value: "170", title: "১৭০ কেজি" },
  { value: "180", title: "১৮০ কেজি" },
  { value: "190", title: "১৯০ কেজি" },
  { value: "200", title: "২০০ কেজি" },
];

export const complexions: Option[] = [
  { value: "কালো", title: "কালো" },
  { value: "শ্যামলা", title: "শ্যামলা" },
  { value: "উজ্জ্বল শ্যামলা", title: "উজ্জ্বল শ্যামলা" },
  { value: "ফর্সা", title: "ফর্সা" },
  { value: "উজ্জ্বল ফর্সা", title: "উজ্জ্বল ফর্সা" },
];

export const blood_groups: Option[] = [
  { value: "A+", title: "A+" },
  { value: "A-", title: "A-" },
  { value: "B+", title: "B+" },
  { value: "B-", title: "B-" },
  { value: "AB+", title: "AB+" },
  { value: "AB-", title: "AB-" },
  { value: "O+", title: "O+" },
  { value: "O-", title: "O-" },
  { value: "জানা নেই", title: "জানা নেই" },
];

export const education_mediums: Option[] = [
  { value: "জেনারেল", title: "জেনারেল" },
  { value: "কাউমি", title: "কাউমি" },
  { value: "আলিয়া", title: "আলিয়া" },
  { value: "দেশের বাইরে", title: "দেশের বাইরে" },
  { value: "অন্যান্য", title: "অন্যান্য" },
];

export const economic_status: Option[] = [
  { value: "নিম্নবিত্ত", title: "নিম্নবিত্ত" },
  { value: "নিম্ন মধ্যবিত্ত", title: "নিম্ন মধ্যবিত্ত" },
  { value: "মধ্যবিত্ত", title: "মধ্যবিত্ত" },
  { value: "উচ্চ মধ্যবিত্ত", title: "উচ্চ মধ্যবিত্ত" },
  { value: "উচ্চবিত্ত", title: "উচ্চবিত্ত" },
];

export const professions: Option[] = [
  { value: "ব্যবসায়ী", title: "ব্যবসায়ী" },
  { value: "সরকারী চাকুরী", title: "সরকারী চাকুরী" },
  { value: "বেসরকারী চাকুরী", title: "বেসরকারী চাকুরী" },
  { value: "প্রবাসী", title: "প্রবাসী" },
  { value: "শিক্ষক", title: "শিক্ষক" },
  { value: "শিক্ষার্থী", title: "শিক্ষার্থী" },
  { value: "ফ্রিল্যান্সার", title: "ফ্রিল্যান্সার" },
  { value: "ডাক্তার", title: "ডাক্তার" },
  { value: "কৃষক", title: "কৃষক" },
  { value: "অন্যান্য", title: "অন্যান্য" },
  { value: "পেশা নেই", title: "পেশা নেই" },
];

export const mazhabs: Option[] = [
  { value: "হানাফী (সুন্নি)", title: "হানাফী (সুন্নি)" },
  { value: "মালিকি(সুন্নি)", title: "মালিকি(সুন্নি)" },
  { value: "শাফিয়ি (সুন্নি)", title: "শাফিয়ি (সুন্নি)" },
  { value: "হানবালী (সুন্নি)", title: "হানবালী (সুন্নি)" },
  { value: "আহলে হাদিস", title: "আহলে হাদিস" },
  { value: "জাহিরি (শিয়া)", title: "জাহিরি (শিয়া)" },
  { value: "জাফরি (শিয়া)", title: "জাফরি (শিয়া)" },
  { value: "যায়দী (শিয়া)", title: "যায়দী (শিয়া)" },
];
