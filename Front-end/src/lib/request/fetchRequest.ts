// ! must be server side
"use server";
import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface FetchResponse<T> {
  data: T;
  status: number;
}
type Props = {
  url: string;
  options: RequestInit;
  tagRevalidate?: string[];
  pathRevalidate?: string[];
};
export const fetchRequest = async <T>({
  url,
  options = {},
  tagRevalidate,
  pathRevalidate,
}: Props): Promise<FetchResponse<T>> => {
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

  // Check if the response is OK
  if (!response.ok) {
    // Handle authentication errors
    if (response.status === 401) {
      // remove auth cookie
      deleteAuthCookies();
      redirect("/login");
    } else {
      // Parse the error response if available
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP error! Status: ${response.status}` };
      }
      return { data: errorData, status: response.status };
    }
  }
  // Revalidate caching for tags
  if (tagRevalidate && tagRevalidate.length > 0) {
    await Promise.all(tagRevalidate.map(tag => revalidateTag(tag)));
  }

  // Revalidate caching for paths
  if (pathRevalidate && pathRevalidate.length > 0) {
    await Promise.all(pathRevalidate.map(path => revalidatePath(path)));
  }
  const data: T = await response.json();
  return { data, status: response.status };
};
