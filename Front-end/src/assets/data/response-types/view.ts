import { BioInterface } from "@/assets/data/response-types/bio";
import { UserInterface } from "@/assets/data/response-types/users";
import { DataWithPagination, Timestamps } from ".";

export interface ViewInterface extends Timestamps {
  id: number;
  user: UserInterface;
  bio: BioInterface;
}

// View info with form
export interface ViewFormInterface<Error> extends ViewInterface {
  message?: string;
  errors?: Partial<Error>;
}

export type ViewsWithPagination = DataWithPagination<ViewInterface>;
