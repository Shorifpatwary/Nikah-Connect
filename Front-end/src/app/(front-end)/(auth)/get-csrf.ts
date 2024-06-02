import { backendUrl } from "@/assets/data/config/app.config";

const getCsrfCookie = async (): Promise<void> => {
  try {
    const url = `${backendUrl}/sanctum/csrf-cookie`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
  } catch (error) {
    console.error({
      error: `SERVER ERROR: ${error instanceof Error ? error.message : String(error)}`,
    });
    throw error;
  }
};

export default getCsrfCookie;
