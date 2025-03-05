import { UserInterface } from "@/assets/data/response-types/users";
import { DataWithPagination, Timestamps } from ".";

export interface CoinInterface extends Timestamps {
  id: number;
  total_coin: string;
  total_purchase: string;
  total_used: string;

  user: UserInterface;
}
// coin info with form
export interface CoinFormInterface<Error> extends CoinInterface {
  message?: string;
  errors?: Partial<Error>;
}

export type CoinsWithPagination = DataWithPagination<CoinInterface>;
