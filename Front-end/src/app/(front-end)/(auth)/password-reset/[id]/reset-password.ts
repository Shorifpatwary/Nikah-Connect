import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";
import { ResetSchemaType } from "@/app/(front-end)/(auth)/password-reset/[id]/form";

import { backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { fetchRequest } from "@/lib/request/fetchRequest";
type ResponseType = UserFormInterface<ResetSchemaType>;
const ResetPassword = async <T>(data: T): Promise<ResponseType> => {
  try {
    // Make fetch request to set CSRF cookie
    await getCsrfCookie();

    // Make fetch request to register user
    const url = `${backendUrl}/reset-password`;
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
export default ResetPassword;

// import { ResponseDataType } from "@/app/(front-end)/(auth)/types";
// import axios from "@/lib/axois";

// // Combined type for both error and success responses
// export const csrf = () => axios.get("/sanctum/csrf-cookie");
// const ResetPassword = async <T>(data: T): Promise<ResponseDataType> => {
//   try {
//     // Make fetch request to set CSRF cookie
//     await csrf();
//     // Make fetch request to register user
//     const response = await axios.post<ResponseDataType>(
//       "/reset-password",
//       data
//     );
//     return response;
//   } catch (error) {
//     return {
//       error: `SERVER ERROR ${error}`,
//     };
//   }
// };
// export default ResetPassword;
