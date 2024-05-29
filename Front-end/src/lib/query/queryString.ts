import { useSearchParams } from "next/navigation";
import React from "react";
export interface QueryParams {
  sort?: string;
  sort_direction?: "asc" | "desc";
  page?: number;
  per_page?: number;
  search?: string | null;
}
export const queryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (params: Partial<QueryParams>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  return createQueryString;
};
