import { getHeaders } from "@/lib/request/header/getHeaders";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { redirect } from "next/navigation";
// Define a generic type for the JSON response

export const fetchRequest = async <T>(
  url: string,
  options: RequestInit = {},
  authCheck: boolean = true
): Promise<T> => {
  const headers = await getHeaders();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: "include", // Include credentials for cross-origin requests
  });
  // update the credentials
  await setCookiesFromResponse(response);

  // Check if the response is OK (status in the range 200-299)
  if (!response.ok) {
    // Parse the error response if available
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `HTTP error! Status: ${response.status}` };
    }

    // Handle authentication errors
    if (
      (response.status === 409 || response.status === 401) &&
      authCheck === true
    ) {
      redirect("/login");
    }

    throw errorData;
  }
  const data: T = await response.json();
  return data;
};
