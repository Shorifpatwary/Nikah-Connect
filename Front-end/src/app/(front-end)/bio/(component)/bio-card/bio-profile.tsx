import GenerateBioProfileLabel from "@/app/(front-end)/bio/(component)/bio-card/generateBioProfileLabel";
import { BioInterface } from "@/assets/data/response-types/bio";
import dummyAvatarImage from "@/assets/icons/dummy-avatar.svg";
import lowFemaleAvatarImage from "@/assets/icons/low-level-muslim-female-avatar.svg";
import lowMaleAvatarImage from "@/assets/icons/low-level-muslim-male-avatar.svg";
import midFemaleAvatarImage from "@/assets/icons/mid-level-muslim-female-avatar.svg";
import midMaleAvatarImage from "@/assets/icons/mid-level-muslim-male-avatar.svg";
import topFemaleAvatarImage from "@/assets/icons/top-level-muslim-female-avatar.svg";
import topMaleAvatarImage from "@/assets/icons/top-level-muslim-male-avatar.svg";
import { Option } from "@/components/blocks/inputBox/selectBox";
import Image from "next/image";

interface Props extends Pick<BioInterface, "bio_profile"> {
  className?: string;
}

export const bio_profile_type_options: Option[] = [
  {
    value: "TOP_MALE",
    label: (
      <GenerateBioProfileLabel
        bio_profile="TOP_MALE"
        labelText="অত্যন্ত ধর্মপরায়ণ মুসলিম (পাত্র)"
      />
    ),
  },
  {
    value: "MID_MALE",
    label: (
      <GenerateBioProfileLabel
        bio_profile="MID_MALE"
        labelText="মাঝারি ধর্মপরায়ণ মুসলিম (পাত্র)"
      />
    ),
  },
  {
    value: "LOW_MALE",
    label: (
      <GenerateBioProfileLabel
        bio_profile="LOW_MALE"
        labelText="কম ধর্মপরায়ণ মুসলিম (পাত্র)"
      />
    ),
  },
  {
    value: "TOP_FEMALE",
    label: (
      <GenerateBioProfileLabel
        bio_profile="TOP_FEMALE"
        labelText="অত্যন্ত ধর্মপরায়ণ মুসলিমা (পাত্রী)"
      />
    ),
  },
  {
    value: "MID_FEMALE",
    label: (
      <GenerateBioProfileLabel
        bio_profile="MID_FEMALE"
        labelText="মাঝারি ধর্মপরায়ণ মুসলিমা (পাত্রী)"
      />
    ),
  },
  {
    value: "LOW_FEMALE",
    label: (
      <GenerateBioProfileLabel
        bio_profile="LOW_FEMALE"
        labelText="কম ধর্মপরায়ণ মুসলিমা (পাত্রী)"
      />
    ),
  },
];

/**
 * Function to filter bio profile types based on gender.
 * @param gender - "male" or "female"
 * @returns Filtered bio profile options for the opposite gender.
 */
export const getOppositeBioProfiles = (gender: "male" | "female") => {
  const isMale = gender === "male";
  return bio_profile_type_options.filter(profile =>
    isMale ? profile.value.includes("FEMALE") : profile.value.includes("MALE")
  );
};

const BioProfile = ({ className, bio_profile }: Props) => {
  if (bio_profile === "TOP_MALE") {
    return (
      <Image
        className={className}
        src={topMaleAvatarImage}
        alt="Best practicing Muslim male avatar"
        title="Top practicing Muslim male"
      />
    );
  } else if (bio_profile === "MID_MALE") {
    return (
      <Image
        className={className}
        src={midMaleAvatarImage}
        alt="Medium practicing Muslim male avatar"
        title="Medium practicing Muslim male"
      />
    );
  } else if (bio_profile === "LOW_MALE") {
    return (
      <Image
        className={className}
        src={lowMaleAvatarImage}
        alt="Low practicing Muslim male avatar"
        title="Low practicing Muslim male"
      />
    );
  } else if (bio_profile === "TOP_FEMALE") {
    return (
      <Image
        className={className}
        src={topFemaleAvatarImage}
        alt="Best practicing Muslim female avatar"
        title="Top practicing Muslim female"
      />
    );
  } else if (bio_profile === "MID_FEMALE") {
    return (
      <Image
        className={className}
        src={midFemaleAvatarImage}
        alt="Medium practicing Muslim female avatar"
        title="Medium practicing Muslim female"
      />
    );
  } else if (bio_profile === "LOW_FEMALE") {
    return (
      <Image
        className={className}
        src={lowFemaleAvatarImage}
        alt="Low practicing Muslim female avatar"
        title="Low practicing Muslim female"
      />
    );
  } else {
    return (
      <Image
        className={className}
        src={dummyAvatarImage}
        alt="Default Muslim avatar"
        title="Default Muslim avatar"
      />
    );
  }
};

export default BioProfile;
