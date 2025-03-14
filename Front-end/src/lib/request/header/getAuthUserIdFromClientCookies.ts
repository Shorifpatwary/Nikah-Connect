"use client";

import { userCookieName } from "@/assets/data/config/app.config";
import getClientCookie from "@/lib/request/header/getClientCookie";

const getAuthUserIdFromClientCookies = (): string | null => {
  try {
    // Attempt to get the cookie
    const authUserCookie = getClientCookie(userCookieName);

    // Check if the cookie exists
    if (!authUserCookie) {
      return null;
    }
    // Attempt to parse the cookie and handle potential errors
    const authUser = JSON.parse(authUserCookie);
    return authUser?.id || null;
  } catch (error) {
    console.error("Error accessing authUser cookie:", error);

    return null; // Return null if an error occurs
  }
};

export default getAuthUserIdFromClientCookies;
