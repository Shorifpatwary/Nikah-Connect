import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { LocationType } from "@/assets/data/response-types/locations";
import {
  BioProfileType,
  BioStatusType,
  BioType,
  BloodType,
  ComplexionType,
  EconomicStatusType,
  EducationType,
  GenderType,
  HeightType,
  MaritalStatusType,
  MazhabType,
  ProfessionType,
  WeightType,
} from "@/assets/data/response-types/status-types";
import { TagInterface } from "@/assets/data/response-types/tag";
import { DataWithPagination, Timestamps } from ".";

export interface BioInterface extends Timestamps {
  id: number;
  title: string;
  bio_profile: BioProfileType;
  status: BioStatusType;
  tags: TagInterface[];
  type: BioType;
  general_section?: GeneralSectionInterface;
  location_section?: LocationSectionInterface;
  education_section?: EducationSectionInterface;
  personal_details?: PersonalDetailsSectionInterface;
  family_info_sections?: FamilyInfoSectionInterface;
  profession_section?: ProfessionInterface;
  religious_activity?: ReligiousActivityInterface;
  marriage_info?: MarriageInfoInterface;
  expected_partner?: ExpectedPartnerInterface;
  filled_marks?: FilledMarksInterface;
  hidden_info?: HiddenInfoInterface;
}

export type ShortBioInterface = Pick<
  BioInterface,
  "id" | "title" | "status" | "type" | "bio_profile"
> & {
  general_section: Pick<
    NonNullable<BioInterface["general_section"]>,
    | "id"
    | "gender"
    | "marital_status"
    | "birth_date"
    | "height"
    | "weight"
    | "complexion"
    | "blood_group"
    | "location"
  >;
  location_section: Pick<
    NonNullable<BioInterface["location_section"]>,
    "permanent_address"
  >;
  education_section: Pick<
    NonNullable<BioInterface["education_section"]>,
    "education_medium" | "previous_exams"
  >;
  family_info_sections: Pick<
    NonNullable<BioInterface["family_info_sections"]>,
    "family_members_info" | "economic_status"
  >;
  profession_section: Pick<
    NonNullable<BioInterface["profession_section"]>,
    "profession" | "profession_description"
  >;
  religious_activity: Pick<
    NonNullable<BioInterface["religious_activity"]>,
    "mazhab"
  >;
  marriage_info: Pick<
    NonNullable<BioInterface["marriage_info"]>,
    "prev_marriage"
  >;
  hidden_info: Pick<
    NonNullable<BioInterface["hidden_info"]>,
    | "name"
    | "email"
    | "location"
    | "family_members_name"
    | "current_parent"
    | "parent_mobile"
  >;
};

type BioWithSection<K extends keyof BioInterface> = Pick<
  BioInterface,
  "id" | "title" | "bio_profile" | "status" | "type" | K
>;

export type BioWithGeneralSection = BioWithSection<"general_section">;
export type BioWithLocationSection = BioWithSection<"location_section">;
export type BioWithEducationSection = BioWithSection<"education_section">;
export type BioWithPersonalDetails = BioWithSection<"personal_details">;
export type BioWithFamilyInfoSection = BioWithSection<"family_info_sections">;
export type BioWithProfessionSection = BioWithSection<"profession_section">;
export type BioWithReligiousActivity = BioWithSection<"religious_activity">;
export type BioWithMarriageInfo = BioWithSection<"marriage_info">;
export type BioWithExpectedPartner = BioWithSection<"expected_partner">;
export type BioWithHiddenInfos = BioWithSection<"hidden_info">;
export type BioWithFilledMarks = BioWithSection<"filled_marks">;

export type BiosWithPagination = DataWithPagination<BioInterface>;

export interface GeneralSectionInterface extends Timestamps {
  id: number;
  gender: GenderType;
  marital_status: MaritalStatusType;
  birth_date: string;
  height: HeightType;
  weight: WeightType;
  complexion: ComplexionType;
  blood_group: BloodType;
  language_skills: string;
  location_id: number;
  location: LocationType;
}

export interface LocationSectionInterface extends Timestamps {
  id: number;
  permanent_address: string;
  present_address?: string;
  relocate_plan?: string;
  childhood_address?: string;
}

export interface EducationSectionInterface extends Timestamps {
  id: number;
  education_medium: EducationType;
  highest_qualification: string;
  current_study?: string;
  previous_exams: string;
  other_qualifications?: string;
}

export interface PersonalDetailsSectionInterface extends Timestamps {
  id: number;
  about_yourself: string;
  outdoor_clothing: string;
  physical_mental_illness: string;
  favorite_books?: string;
  favorite_online_personalities?: string;
  device_usage_time?: string;
  affiliations?: string;
}

export interface FamilyInfoSectionInterface extends Timestamps {
  id: number;
  family_members_info: string;
  descent?: string;
  uncles_info?: string;
  economic_status: EconomicStatusType;
  economic_status_details?: string;
}

export interface ProfessionInterface extends Timestamps {
  id: number;
  profession: ProfessionType;
  profession_description: string;
  monthly_income: string;
}

export interface ExpectedPartnerInterface extends Timestamps {
  id: number;
  age: string;
  complexion: string;
  height: string;
  marital_status: MaritalStatusType;
  educational_qualification: string;
  profession: string;
  economic_status: EconomicStatusType;
  bio_profile_types: BioProfileType;
  family?: string;
  about_partner?: string;
}

export interface HiddenInfoInterface extends Timestamps {
  id: number;
  name: string;
  family_members_name: string;
  location: string;
  current_parent: string;
  parent_mobile: string;
  permanent_address_map_location?: string;
  present_address_map_location?: string;
  email: string;
  social_links?: string;
  documents_link: URL;
}

export interface ReligiousActivityInterface extends Timestamps {
  id: number;
  prayer_habits?: string;
  haram_relationships?: string;
  quran_recitation?: string;
  mahram_adherence?: string;
  has_beard?: string;
  entertainment_habits?: string;
  mazhab: MazhabType;
  religious_beliefs?: string;
  religious_knowledge?: string;
  family_religious_environment?: string;
}

export interface MarriageInfoInterface extends Timestamps {
  id: number;
  prev_marriage?: string;
  work_after: string;
  study_after: string;
  ceremony_plans?: string;
  partner_view_rules?: string;
  marriage_weakness?: string;
  family_pref?: string;
  dowry_amount: string;
  dowry_opinion?: string;
  compromise_factors?: string;
  cash_gift_opinion?: string;
}
// Generic form interface for common fields
export interface FormErrorInterface<Error> {
  message?: string;
  error: string;
  errors?: Partial<Error>;
}

// BioFormInterface
export interface BioFormInterface<Error>
  extends FormErrorInterface<Error>,
    BioInterface {}

// short bio fom interface
export interface ShortBioFormInterface<Error>
  extends FormErrorInterface<Error>,
    ShortBioInterface {}

// LocationFormInterface
export interface GeneralFormInterface<Error>
  extends FormErrorInterface<Error>,
    GeneralSectionInterface {}

// LocationFormInterface
export interface LocationFormInterface<Error>
  extends FormErrorInterface<Error>,
    LocationSectionInterface {}

// EducationFormInterface
export interface EducationFormInterface<Error>
  extends FormErrorInterface<Error>,
    EducationSectionInterface {}

// PersonalDetailsFormInterface
export interface PersonalDetailsFormInterface<Error>
  extends FormErrorInterface<Error>,
    PersonalDetailsSectionInterface {}

// FamilyInfoFormInterface
export interface FamilyInfoFormInterface<Error>
  extends FormErrorInterface<Error>,
    FamilyInfoSectionInterface {}

// ProfessionFormInterface
export interface ProfessionFormInterface<Error>
  extends FormErrorInterface<Error>,
    ProfessionInterface {}

// ExpectedPartnerFormInterface
export interface ExpectedPartnerFormInterface<Error>
  extends FormErrorInterface<Error>,
    ExpectedPartnerInterface {}

// HiddenInfoFormInterface
export interface HiddenInfoFormInterface<Error>
  extends FormErrorInterface<Error>,
    HiddenInfoInterface {}

// ReligiousActivityFormInterface
export interface ReligiousActivityFormInterface<Error>
  extends FormErrorInterface<Error>,
    ReligiousActivityInterface {}

// MarriageInfoFormInterface
export interface MarriageInfoFormInterface<Error>
  extends FormErrorInterface<Error>,
    MarriageInfoInterface {}
