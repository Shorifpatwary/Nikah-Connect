import { createCookie } from "@/app/(front-end)/(auth)/authCookie";
import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";
import { LoginSchemaType } from "@/app/(front-end)/(auth)/login/login-form";

import { backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { fetchRequest } from "@/lib/request/fetchRequest";
type ResponseType = UserFormInterface<LoginSchemaType>;
export const Login = async <T>(data: T): Promise<ResponseType> => {
  try {
    // Make fetch request to set CSRF cookie
    await getCsrfCookie();

    // Make fetch request to register user
    const url = `${backendUrl}/login`;
    const response = await fetchRequest<ResponseType>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    // set user data to the cookie only when response send a user data
    createCookie(response);
    return response;
  } catch (error) {
    // @ts-ignore: Property 'errors' does not exist on type '{}'.
    if (error?.errors) {
      return error as ResponseType;
    }
    console.error({
      error: `SERVER ERROR: ${error instanceof Error ? error.message : JSON.stringify(error)} simple error ${error}`,
    });
    throw error;
  }
};
