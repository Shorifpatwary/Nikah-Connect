import { Timestamps } from "@/assets/data/response-types";
import { BioInterface } from "@/assets/data/response-types/bio";

export interface FilledMarksInterface extends Timestamps {
  id: number;
  general_filled_marks?: number;
  location_filled_marks?: number;
  education_filled_marks?: number;
  personal_info_filled_marks?: number;
  family_filled_marks?: number;
  profession_filled_marks?: number;
  religious_activity_filled_marks?: number;
  marital_info_filled_marks?: number;
  expected_partner_filled_marks?: number;
  hidden_info_filled_marks?: number;

  bio: BioInterface;
}
// user info with form
export interface FilledMarksFormInterface<Error> extends FilledMarksInterface {
  message?: string;
  errors?: Partial<Error>;
}

// export type FMWithPagination = DataWithPagination<FilledMarksInterface>;
