"use server";
import { cookies } from "next/headers";

export const getHeaders = async (): Promise<Record<string, string>> => {
  const xsrfToken = await cookies().get("XSRF-TOKEN");
  const connectNikahSession = await cookies().get("connect_nikah_session");
  const cookie = await cookies().getAll();

  // Return the headers
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-xsrf-token": xsrfToken?.value || "",
    connect_nikah_session: connectNikahSession?.value || "",
    // "Access-Control-Max-Age": "600",

    // Cookies are automatically included in the fetch request, so no need to manually set the cookie header
  };
};
