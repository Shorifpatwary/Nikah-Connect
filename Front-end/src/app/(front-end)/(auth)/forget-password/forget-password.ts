import { ForgetSchemaType } from "@/app/(front-end)/(auth)/forget-password/forget-form";
import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";

import { backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { fetchRequest } from "@/lib/request/fetchRequest";
type ResponseType = UserFormInterface<ForgetSchemaType>;
const ForgetPassword = async <T>(data: T): Promise<ResponseType> => {
  try {
    // Make fetch request to set CSRF cookie
    await getCsrfCookie();

    // Make fetch request to register user
    const url = `${backendUrl}/forgot-password`;
    const response = await fetchRequest<ResponseType>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

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
export default ForgetPassword;
