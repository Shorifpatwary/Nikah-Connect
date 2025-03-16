import { BioInterface } from "@/assets/data/response-types/bio";
import { UserInterface } from "@/assets/data/response-types/users";
import { DataWithPagination, Timestamps } from ".";

export interface PurchaseInterface extends Timestamps {
  id: number;
  user: UserInterface;
  bio: BioInterface;
}

// Purchase info with form
export interface PurchaseFormInterface<Error> extends PurchaseInterface {
  message?: string;
  errors?: Partial<Error>;
}

export type PurchasesWithPagination = DataWithPagination<PurchaseInterface>;
