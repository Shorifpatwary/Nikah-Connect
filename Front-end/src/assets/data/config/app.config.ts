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
export const shortBios = "shortBios";
export const generals = "generals";
export const locations = "locations";
export const educations = "educations";
export const personalDetails = "personalDetails";
export const familyInfos = "familyInfos";
export const filledMarks = "filled_marks";
export const professionInfo = "professionInfo";
export const religiousActivities = "religiousActivities";
export const marriageInfo = "marriageInfo";
export const expectedPartner = "expectedPartner";
export const hiddenInfo = "hiddenInfo";
export const allCoinsTag = "coins";
export const allViewsTag = "views";
export const allPurchasesTag = "purchases";

// ! user  roles from "RolesEnum.php"
export const roles: Option[] = [
  { value: "user", label: "user" },
  { value: "admin", label: "admin" },
  { value: "super-admin", label: "super admin" },
  { value: "editor", label: "editor" },
  { value: "writer", label: "writer" },
];

export const genders: Option[] = [
  { value: "পাত্র", label: "পাত্র" },
  { value: "পাত্রী", label: "পাত্রী" },
];

export const marital_status: Option[] = [
  { value: "অবিবাহিত", label: "অবিবাহিত" },
  { value: "বিবাহিত", label: "বিবাহিত" },
  { value: "ডিভোর্সড", label: "ডিভোর্সড" },
  { value: "সহধর্মীহীন", label: "বিধবা / বিপত্নিক" },
];

export const heights: Option[] = [
  { value: "3.0", label: "৩' ০''" },
  { value: "3.1", label: "৩' ১''" },
  { value: "3.2", label: "৩' ২''" },
  { value: "3.3", label: "৩' ৩''" },
  { value: "3.4", label: "৩' ৪''" },
  { value: "3.5", label: "৩' ৫''" },
  { value: "3.6", label: "৩' ৬''" },
  { value: "3.7", label: "৩' ৭''" },
  { value: "3.8", label: "৩' ৮''" },
  { value: "3.9", label: "৩' ৯''" },
  { value: "3.10", label: "৩' ১০''" },
  { value: "3.11", label: "৩' ১১''" },

  { value: "4.0", label: "৪' ০''" },
  { value: "4.1", label: "৪' ১''" },
  { value: "4.2", label: "৪' ২''" },
  { value: "4.3", label: "৪' ৩''" },
  { value: "4.4", label: "৪' ৪''" },
  { value: "4.5", label: "৪' ৫''" },
  { value: "4.6", label: "৪' ৬''" },
  { value: "4.7", label: "৪' ৭''" },
  { value: "4.8", label: "৪' ৮''" },
  { value: "4.9", label: "৪' ৯''" },
  { value: "4.10", label: "৪' ১০''" },
  { value: "4.11", label: "৪' ১১''" },

  { value: "5.0", label: "৫' ০''" },
  { value: "5.1", label: "৫' ১''" },
  { value: "5.2", label: "৫' ২''" },
  { value: "5.3", label: "৫' ৩''" },
  { value: "5.4", label: "৫' ৪''" },
  { value: "5.5", label: "৫' ৫''" },
  { value: "5.6", label: "৫' ৬''" },
  { value: "5.7", label: "৫' ৭''" },
  { value: "5.8", label: "৫' ৮''" },
  { value: "5.9", label: "৫' ৯''" },
  { value: "5.10", label: "৫' ১০''" },
  { value: "5.11", label: "৫' ১১''" },

  { value: "6.0", label: "৬' ০''" },
  { value: "6.1", label: "৬' ১''" },
  { value: "6.2", label: "৬' ২''" },
  { value: "6.3", label: "৬' ৩''" },
  { value: "6.4", label: "৬' ৪''" },
  { value: "6.5", label: "৬' ৫''" },
  { value: "6.6", label: "৬' ৬''" },
  { value: "6.7", label: "৬' ৭''" },
  { value: "6.8", label: "৬' ৮''" },
  { value: "6.9", label: "৬' ৯''" },
  { value: "6.10", label: "৬' ১০''" },
  { value: "6.11", label: "৬' ১১''" },

  { value: "7.0", label: "৭' ০''" },
  { value: "7.1", label: "৭' ১''" },
  { value: "7.2", label: "৭' ২''" },
  { value: "7.3", label: "৭' ৩''" },
  { value: "7.4", label: "৭' ৪''" },
  { value: "7.5", label: "৭' ৫''" },
  { value: "7.6", label: "৭' ৬''" },
  { value: "7.7", label: "৭' ৭''" },
  { value: "7.8", label: "৭' ৮''" },
  { value: "7.9", label: "৭' ৯''" },
  { value: "7.10", label: "৭' ১০''" },
  { value: "7.11", label: "৭' ১১''" },
];

export const weights: Option[] = [
  { value: "20", label: "২০ কেজি" },
  { value: "21", label: "২১ কেজি" },
  { value: "22", label: "২২ কেজি" },
  { value: "23", label: "২৩ কেজি" },
  { value: "24", label: "২৪ কেজি" },
  { value: "25", label: "২৫ কেজি" },
  { value: "26", label: "২৬ কেজি" },
  { value: "27", label: "২৭ কেজি" },
  { value: "28", label: "২৮ কেজি" },
  { value: "29", label: "২৯ কেজি" },

  { value: "30", label: "৩০ কেজি" },
  { value: "31", label: "৩১ কেজি" },
  { value: "32", label: "৩২ কেজি" },
  { value: "33", label: "৩৩ কেজি" },
  { value: "34", label: "৩৪ কেজি" },
  { value: "35", label: "৩৫ কেজি" },
  { value: "36", label: "৩৬ কেজি" },
  { value: "37", label: "৩৭ কেজি" },
  { value: "38", label: "৩৮ কেজি" },
  { value: "39", label: "৩৯ কেজি" },

  { value: "40", label: "৪০ কেজি" },
  { value: "41", label: "৪১ কেজি" },
  { value: "42", label: "৪২ কেজি" },
  { value: "43", label: "৪৩ কেজি" },
  { value: "44", label: "৪৪ কেজি" },
  { value: "45", label: "৪৫ কেজি" },
  { value: "46", label: "৪৬ কেজি" },
  { value: "47", label: "৪৭ কেজি" },
  { value: "48", label: "৪৮ কেজি" },
  { value: "49", label: "৪৯ কেজি" },

  { value: "50", label: "৫০ কেজি" },
  { value: "51", label: "৫১ কেজি" },
  { value: "52", label: "৫২ কেজি" },
  { value: "53", label: "৫৩ কেজি" },
  { value: "54", label: "৫৪ কেজি" },
  { value: "55", label: "৫৫ কেজি" },
  { value: "56", label: "৫৬ কেজি" },
  { value: "57", label: "৫৭ কেজি" },
  { value: "58", label: "৫৮ কেজি" },
  { value: "59", label: "৫৯ কেজি" },

  { value: "60", label: "৬০ কেজি" },
  { value: "61", label: "৬১ কেজি" },
  { value: "62", label: "৬২ কেজি" },
  { value: "63", label: "৬৩ কেজি" },
  { value: "64", label: "৬৪ কেজি" },
  { value: "65", label: "৬৫ কেজি" },
  { value: "66", label: "৬৬ কেজি" },
  { value: "67", label: "৬৭ কেজি" },
  { value: "68", label: "৬৮ কেজি" },
  { value: "69", label: "৬৯ কেজি" },

  { value: "70", label: "৭০ কেজি" },
  { value: "71", label: "৭১ কেজি" },
  { value: "72", label: "৭২ কেজি" },
  { value: "73", label: "৭৩ কেজি" },
  { value: "74", label: "৭৪ কেজি" },
  { value: "75", label: "৭৫ কেজি" },
  { value: "76", label: "৭৬ কেজি" },
  { value: "77", label: "৭৭ কেজি" },
  { value: "78", label: "৭৮ কেজি" },
  { value: "79", label: "৭৯ কেজি" },

  { value: "80", label: "৮০ কেজি" },
  { value: "81", label: "৮১ কেজি" },
  { value: "82", label: "৮২ কেজি" },
  { value: "83", label: "৮৩ কেজি" },
  { value: "84", label: "৮৪ কেজি" },
  { value: "85", label: "৮৫ কেজি" },
  { value: "86", label: "৮৬ কেজি" },
  { value: "87", label: "৮৭ কেজি" },
  { value: "88", label: "৮৮ কেজি" },
  { value: "89", label: "৮৯ কেজি" },

  { value: "90", label: "৯০ কেজি" },
  { value: "91", label: "৯১ কেজি" },
  { value: "92", label: "৯২ কেজি" },
  { value: "93", label: "৯৩ কেজি" },
  { value: "94", label: "৯৪ কেজি" },
  { value: "95", label: "৯৫ কেজি" },
  { value: "96", label: "৯৬ কেজি" },
  { value: "97", label: "৯৭ কেজি" },
  { value: "98", label: "৯৮ কেজি" },
  { value: "99", label: "৯৯ কেজি" },

  { value: "100", label: "১০০ কেজি" },
  { value: "105", label: "১০৫ কেজি" },
  { value: "110", label: "১১০ কেজি" },
  { value: "115", label: "১১৫ কেজি" },
  { value: "120", label: "১২০ কেজি" },
  { value: "125", label: "১২৫ কেজি" },
  { value: "130", label: "১৩০ কেজি" },
  { value: "135", label: "১৩৫ কেজি" },
  { value: "140", label: "১৪০ কেজি" },
  { value: "145", label: "১৪৫ কেজি" },
  { value: "150", label: "১৫০ কেজি" },

  { value: "160", label: "১৬০ কেজি" },
  { value: "170", label: "১৭০ কেজি" },
  { value: "180", label: "১৮০ কেজি" },
  { value: "190", label: "১৯০ কেজি" },
  { value: "200", label: "২০০ কেজি" },
];

export const complexions: Option[] = [
  { value: "কালো", label: "কালো" },
  { value: "শ্যামলা", label: "শ্যামলা" },
  { value: "উজ্জ্বল শ্যামলা", label: "উজ্জ্বল শ্যামলা" },
  { value: "ফর্সা", label: "ফর্সা" },
  { value: "উজ্জ্বল ফর্সা", label: "উজ্জ্বল ফর্সা" },
];

export const blood_groups: Option[] = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "জানা নেই", label: "জানা নেই" },
];

export const education_mediums: Option[] = [
  { value: "জেনারেল", label: "জেনারেল" },
  { value: "কাউমি", label: "কাউমি" },
  { value: "আলিয়া", label: "আলিয়া" },
  { value: "দেশের বাইরে", label: "দেশের বাইরে" },
  { value: "অন্যান্য", label: "অন্যান্য" },
];

export const economic_status: Option[] = [
  { value: "নিম্নবিত্ত", label: "নিম্নবিত্ত" },
  { value: "নিম্ন মধ্যবিত্ত", label: "নিম্ন মধ্যবিত্ত" },
  { value: "মধ্যবিত্ত", label: "মধ্যবিত্ত" },
  { value: "উচ্চ মধ্যবিত্ত", label: "উচ্চ মধ্যবিত্ত" },
  { value: "উচ্চবিত্ত", label: "উচ্চবিত্ত" },
];

export const professions: Option[] = [
  { value: "ব্যবসায়ী", label: "ব্যবসায়ী" },
  { value: "সরকারী চাকুরী", label: "সরকারী চাকুরী" },
  { value: "বেসরকারী চাকুরী", label: "বেসরকারী চাকুরী" },
  { value: "প্রবাসী", label: "প্রবাসী" },
  { value: "শিক্ষক", label: "শিক্ষক" },
  { value: "শিক্ষার্থী", label: "শিক্ষার্থী" },
  { value: "ফ্রিল্যান্সার", label: "ফ্রিল্যান্সার" },
  { value: "ডাক্তার", label: "ডাক্তার" },
  { value: "কৃষক", label: "কৃষক" },
  { value: "অন্যান্য", label: "অন্যান্য" },
  { value: "পেশা নেই", label: "পেশা নেই" },
];

export const mazhabs: Option[] = [
  { value: "হানাফী (সুন্নি)", label: "হানাফী (সুন্নি)" },
  { value: "মালিকি (সুন্নি)", label: "মালিকি (সুন্নি)" },
  { value: "শাফিয়ি (সুন্নি)", label: "শাফিয়ি (সুন্নি)" },
  { value: "হানবালী (সুন্নি)", label: "হানবালী (সুন্নি)" },
  { value: "আহলে হাদিস", label: "আহলে হাদিস" },
  { value: "জাহিরি (শিয়া)", label: "জাহিরি (শিয়া)" },
  { value: "জাফরি (শিয়া)", label: "জাফরি (শিয়া)" },
  { value: "যায়দী (শিয়া)", label: "যায়দী (শিয়া)" },
];

export const bio_user_status: Option[] = [
  { value: "married", label: "বিবাহিত" },
  { value: "inactive", label: "নিষ্ক্রিয়" },
  { value: "approved", label: "সক্রিয়" },
];

export const bioMinFilledMarks = {
  general: 85,
  location: 25,
  education: 50,
  personal_info: 40,
  family: 60,
  profession: 100,
  religious: 20,
  marital: 20,
  expected_partner: 50,
  hidden: 50,
};
