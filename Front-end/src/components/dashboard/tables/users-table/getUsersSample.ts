import { UsersWithPagination } from "@/assets/data/response-types/users";
import { getQueryString } from "@/lib/query/getQueryString";
import { redirect } from "next/navigation";

// Combined type for both error and success responses

const getUsersF = async (): Promise<{
  data?: UsersWithPagination;
  error?: string;
}> => {
  try {
    const queryString = getQueryString();

    // Construct the request URL with query string
    const url = `http://localhost:8000/api/user${queryString ? "?" + queryString : ""}`;
    // Make fetch request to register user
    // Make fetch request to register user
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else if (response.status === 409) {
     redirect('/login')
    }

    // Parse the JSON response
    const data = await response.json();
    console.log(data, "users fetch");
    return { data };
  } catch (error) {
    return {
      error: `SERVER ERROR: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
export default getUsersF;
