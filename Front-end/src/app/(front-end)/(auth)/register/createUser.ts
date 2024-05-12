import axios from "@/lib/axois";
import { AxiosResponse } from "axios";
import { RegistrationSchemaType } from "./registration-form";

// Define TypeScript types for response data

// Type for the response when there is an error (status code 422)
interface ErrorResponse {
  data: {
    message: string;
    errors: Record<string, string[]>;
  };
  status: number;
  statusText: string;
}

// Type for the successful response (status code 200)
interface SuccessResponse {
  data: {
    name: string;
    email: string;
    phone: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  status: number;
  statusText: string;
}

// Combined type for both error and success responses
type ResponseDataType = ErrorResponse | SuccessResponse;

export const csrf = () => axios.get("/sanctum/csrf-cookie");
export async function createUser(
  data: RegistrationSchemaType
): Promise<ResponseDataType> {
  try {
    // Make fetch request to set CSRF cookie
    await csrf();
    // Make fetch request to register user
    const response: AxiosResponse<ResponseDataType> = await axios.post(
      "/register",
      data
    );
    return response;
  } catch (error) {
    return {
      error: `SERVER ERROR ${error}`,
    };
  }
}
