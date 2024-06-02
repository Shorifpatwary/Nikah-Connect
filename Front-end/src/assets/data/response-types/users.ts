import { Links, Meta, Timestamps } from ".";

export interface UserInterface extends Timestamps {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
}
// user registration | login | ...
export interface UserFormInterface<Error> extends UserInterface {
  message?: string;
  errors?: Partial<Error>;
  // errors?: Partial<Record<keyof Error, string[]>>;
}

export interface UsersWithPagination extends Meta, Links {
  data: UserInterface[];
}
export interface UsersPagination extends Meta, Links {}
