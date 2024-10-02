"use server";
import { userCookieName } from "@/assets/data/config/app.config";
import { cookies } from "next/headers";

// Utility function to extract user ID from 'authUser' cookie
export async function getUserIdFromCookies(): Promise<string | null> {
  // Retrieve the cookies from the request
  const cookieStore = cookies();

  // Get the 'authUser' cookie
  const authUserCookie = cookieStore.get(userCookieName);

  // If the 'authUser' cookie doesn't exist, return null
  if (!authUserCookie) {
    return null;
  }

  // Parse the 'authUser' cookie to get the user object
  const authUser = JSON.parse(authUserCookie.value);

  // Return the user ID if it exists, otherwise return null
  return authUser?.id || null;
}
