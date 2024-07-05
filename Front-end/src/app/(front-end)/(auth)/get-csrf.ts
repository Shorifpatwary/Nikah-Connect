"use client";
import { frontEndUrl } from "@/assets/data/config/app.config";
import { setCookiesFromResponse } from "@/lib/request/header/setCookies";

const getCsrfCookie = async (): Promise<void> => {
  try {
    // const url = `${backendUrl}/sanctum/csrf-cookie`;
    const url = `${frontEndUrl}/api/csrf-cookie`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    await setCookiesFromResponse(response);
  } catch (error) {
    console.error({
      error: `SERVER ERROR: ${error instanceof Error ? error.message : String(error)}`,
    });
    throw error;
  }
};

export default getCsrfCookie;
