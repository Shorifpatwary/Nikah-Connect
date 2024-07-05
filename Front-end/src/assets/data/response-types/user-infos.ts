import { UserInterface } from "@/assets/data/response-types/users";
import { DataWithPagination, Timestamps } from ".";

export interface UserInfoInterface extends Timestamps {
  id: number;
  device_type: string | null;
  device_os: string | null;
  browser_name: string | null;
  browser_version: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  user_agent: string | null;
  registration_source: string | null;
  device_model: string | null;
  screen_resolution: string | null;
  internet: string | null;
  region: string | null;
  timezone: string | null;
  postal: string | null;
  loc: string | null;
  user: UserInterface;
}
// user info with form
export interface UserFormInterface<Error> extends UserInfoInterface {
  message?: string;
  errors?: Partial<Error>;
  // errors?: Partial<Record<keyof Error, string[]>>;
}

// export interface UsersWithPagination {
//   data: UserInterface[];
//   links: Links;
//   meta: Meta;
// }
export type UsersInfoWithPagination = DataWithPagination<UserInfoInterface>;
