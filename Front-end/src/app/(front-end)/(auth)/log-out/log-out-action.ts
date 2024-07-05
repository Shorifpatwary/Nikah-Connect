"use server";
import { backendUrl } from "@/assets/data/config/app.config";
import { getHeaders } from "@/lib/request/header/getHeaders";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";

export const LogOutAction = async () => {
  const headers = await getHeaders();
  const url = `${backendUrl}/logout`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
    },
    credentials: "include", // Include credentials for cross-origin requests
  });
  // update the credentials
  await setCookiesFromResponse(response);

  // Check if the response is ok
  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, ...errorData };
  }

  return { success: true };
};
