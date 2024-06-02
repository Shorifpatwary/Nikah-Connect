import { UsersWithPagination } from "@/assets/data/response-types/users";
import axios from "@/lib/axois";
import { getQueryString } from "@/lib/query/getQueryString";
import { AxiosResponse } from "axios";

// Combined type for both error and success responses

const getUsersOld = async (): Promise<AxiosResponse<UsersWithPagination>> => {
  try {
    const queryString = getQueryString();

    // Construct the request URL with query string
    const url = `/api/user${queryString ? "?" + queryString : ""}`;
    // Make fetch request to register user
    const response = await axios.get<UsersWithPagination>(url);
    return response;
  } catch (error) {
    console.error({
      error: `SERVER ERROR: ${error instanceof Error ? error.message : String(error)}`,
    });
    throw error;
  }
};
export default getUsersOld;
