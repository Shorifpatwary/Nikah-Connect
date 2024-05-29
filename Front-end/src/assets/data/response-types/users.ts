import { Links, Meta, Timestamps } from ".";

interface UserInterface extends Timestamps {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
}

export interface UsersWithPagination extends Meta, Links {
  data: UserInterface[];
}
export interface UsersPagination extends Meta, Links {}

export default UserInterface;
