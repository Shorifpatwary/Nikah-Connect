import { LocationType } from "@/assets/data/response-types/locations";
import {
  BioStatusType,
  BloodType,
  ComplexionType,
  EconomicStatusType,
  EducationType,
  GenderType,
  MaritalStatusType,
  MazhabType,
} from "@/assets/data/response-types/status-types";
import { TagInterface } from "@/assets/data/response-types/tag";
import { DataWithPagination, Timestamps } from ".";

export interface BioInterface extends Timestamps {
  id: number;
  title: string;
  status: BioStatusType;
  tags: TagInterface[];
  general_section?: generalSectionInterface;
  location_section?: locationSectionInterface;
  education_section?: EducationSectionInterface;
  personal_details?: PersonalDetailsSectionInterface;
  family_info_sections?: FamilyInfoSectionInterface;
  profession_sections?: ProfessionInterface;
  expected_partner?: ExpectedPartnerInterface;
  hidden_infos?: HiddenInfoInterface;
}

// bio info with form
export interface BioFormInterface<Error> extends BioInterface {
  message?: string;
  errors?: Partial<Error>;
}

export type BiosWithPagination = DataWithPagination<BioInterface>;

export interface generalSectionInterface extends Timestamps {
  id: number;
  gender: GenderType;
  marital_status: MaritalStatusType;
  birth_date: string;
  height: string;
  weight: string;
  complexion: ComplexionType;
  blood_group: BloodType;
  language_skills: string;
  location: LocationType;
}

export interface locationSectionInterface extends Timestamps {
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
  uncles_info?: string;
  economic_status: EconomicStatusType;
  economic_status_details?: string;
}

export interface ProfessionInterface extends Timestamps {
  id: number;
  profession: string;
  profession_description: string;
  monthly_income: string;
}

export interface ExpectedPartnerInterface extends Timestamps {
  id: number;
  age: number;
  complexion: string;
  height: number;
  marital_status: MaritalStatusType;
  educational_qualification: string;
  profession: string;
  economic_status: EconomicStatusType;
  family?: string;
  about_partner?: string;
}

export interface HiddenInfoInterface extends Timestamps {
  id: number;
  name: string;
  family_members_name: string;
  current_parent: string;
  parent_mobile: string;
  permanent_address_map_location?: string;
  present_address_map_location?: string;
  email: string;
  social_links?: string;
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
