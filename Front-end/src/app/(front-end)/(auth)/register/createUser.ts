import { ResponseDataType } from "@/app/(front-end)/(auth)/types";
import axios from "@/lib/axois";

export const csrf = () => axios.get<ResponseDataType>("/sanctum/csrf-cookie");
export const createUser = async <T>(data: T): Promise<ResponseDataType> => {
  try {
    // Make fetch request to set CSRF cookie
    await csrf();
    // Make fetch request to register user
    const response = await axios.post<ResponseDataType>("/register", data);
    return response;
  } catch (error) {
    return {
      error: `SERVER ERROR ${error}`,
    };
  }
};
