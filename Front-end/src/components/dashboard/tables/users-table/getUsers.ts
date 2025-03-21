"use client";

import { backendUrl } from "@/assets/data/config/app.config";
import { UsersWithPagination } from "@/assets/data/response-types/users";
import { getQueryString } from "@/lib/query/getQueryString";
import { fetchRequest } from "@/lib/request/fetchRequest";

const getUsers = async () => {
  try {
    const queryString = getQueryString();

    // Construct the request URL with query string
    const url = `${backendUrl}/api/user${queryString ? "?" + queryString : ""}`;

    const response = await fetchRequest<UsersWithPagination>({
      url,
      options: {
        method: "GET",
        // ! Use cache: "force-cache", for 'client' side data fetching
        // cache: "force-cache",
        // next: { revalidate: 3600, tags: [allUsersTag] },
      },
    });
    return response.data;
  } catch (error) {
    console.error({
      error: `SERVER ERROR: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
};
export default getUsers;
