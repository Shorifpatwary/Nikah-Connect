import { TagInterface } from "@/assets/data/response-types/tag";
import { DataWithPagination, Timestamps } from ".";

export interface BioInterface extends Timestamps {
  id: number;
  title: string;
  status: string;
  tags: TagInterface[];
}
// bio info with form
export interface BioFormInterface<Error> extends BioInterface {
  message?: string;
  errors?: Partial<Error>;
}

export type BiosWithPagination = DataWithPagination<BioInterface>;
