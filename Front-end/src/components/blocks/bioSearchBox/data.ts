export type bioTypes = "all" | "bride" | "groom";

export type marriageStatusTypes =
  | "all"
  | "unmarried"
  | "married"
  | "divorced"
  | "widowed";

interface Option<T> {
  title: string;
  value: T;
}
interface SelectType<T> {
  label: string;
  hintText: string;
  triggerText: string;
  options: Option<T>[];
}
interface BioSearchDataType {
  bioTypes: SelectType<bioTypes>;
  marriageStatusTypes: SelectType<marriageStatusTypes>;
  locations: Omit<SelectType<[]>, "options">;
}

export const BioSearchData: BioSearchDataType = {
  bioTypes: {
    label: "আমি খুঁজছি",
    hintText: "বায়োডাটার ধরন সিলেক্ট করুন",
    triggerText: "বায়োডাটার ধরন সিলেক্ট করুন",
    options: [
      {
        title: "সকল",
        value: "all",
      },
      {
        title: "পাত্র",
        value: "bride",
      },
      {
        title: "পাত্রী",
        value: "groom",
      },
    ],
  },
  marriageStatusTypes: {
    label: "বৈবাহিক অবস্থা",
    triggerText: "বৈবাহিক অবস্থার ধরন",
    hintText: "বৈবাহিক অবস্থার ধরন",
    options: [
      {
        title: "সকল",
        value: "all",
      },
      {
        title: "অবিবাহিত",
        value: "unmarried",
      },
      {
        title: "বিবাহিত",
        value: "married",
      },
      {
        title: "তালাকপ্রাপ্ত",
        value: "divorced",
      },
      {
        title: "বিধবা/বিপত্নীক",
        value: "widowed",
      },
    ],
  },
  locations: {
    hintText: "ঠিকানা সিলেক্ট করুন",
    triggerText: "ঠিকানা সিলেক্ট করুন",
    label: "পছন্দের ঠিকানা সিলেক্ট করুন",
  },
};
