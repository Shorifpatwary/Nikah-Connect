"use server";
import { frontEndUrl } from "@/assets/data/config/app.config";
import { cookies } from "next/headers";

export const getHeaders = async (): Promise<Record<string, string>> => {
  const xsrfToken = await cookies().get("XSRF-TOKEN");
  const connectNikahSession = await cookies().get("connect_nikah_session");
  const cookieHeader = await cookies()
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join("; ");

  // Return the headers
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-xsrf-token": xsrfToken?.value || "",
    "x-requested-with": "XMLHttpRequest",
    connect_nikah_session: connectNikahSession?.value || "",
    origin: frontEndUrl,
    Cookie: cookieHeader,
    // Cookies are automatically included in the fetch request, so no need to manually set the cookie header
  };
};
