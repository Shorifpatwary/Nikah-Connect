import axios from "@/lib/axois";
import { RegistrationSchemaType } from "./registration-form";
const csrf = () => axios.get("/sanctum/csrf-cookie");
export async function createUser(data: RegistrationSchemaType) {
  try {
    // Make fetch request to set CSRF cookie
    await csrf();
    // Make fetch request to register user
    const response = await axios.post("/register", data);

    const ResponseData = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
    return ResponseData;
  } catch (error) {
    if (error.response.status === 422) {
      const errorResponseData = {
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
      console.log(errorResponseData, "error response from server");
      return errorResponseData;
    }
    return {
      error: `SERVER ERROR ${error}`,
    };
  }
}
