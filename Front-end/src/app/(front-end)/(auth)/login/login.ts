import axios from "@/lib/axois";

import { ResponseDataType } from "@/app/(front-end)/(auth)/types";

// Combined type for both error and success responses

export const csrf = () => axios.get("/sanctum/csrf-cookie");
const Login = async <T>(data: T): Promise<ResponseDataType> => {
  try {
    // Make fetch request to set CSRF cookie
    await csrf();
    // Make fetch request to register user
    const response = await axios.post<ResponseDataType>("/login", data);
    return response;
  } catch (error) {
    return {
      error: `SERVER ERROR ${error}`,
    };
  }
};
export default Login;
