import { DataWithPagination, Timestamps } from ".";

export interface TagInterface extends Timestamps {
  id: number;
  name: string;
  search_text: string;
  status: "active" | "inactive";
}
// user info with form
export interface UserFormInterface<Error> extends TagInterface {
  message?: string;
  errors?: Partial<Error>;
}

export type TagsWithPagination = DataWithPagination<TagInterface>;
