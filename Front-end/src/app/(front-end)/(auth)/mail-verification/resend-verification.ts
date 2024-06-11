import { backendUrl } from "@/assets/data/config/app.config";
import { fetchRequest } from "@/lib/request/fetchRequest";

const resendVerification = async () => {
  try {
    // Make fetch request to register user
    const url = `${backendUrl}/email/verification-notification`;
    // Make fetch request to register user
    const response = await fetchRequest<ResponseType>(url, {
      method: "POST",
    });
    return response;
  } catch (error) {
    return {
      error: `SERVER ERROR ${error}`,
    };
  }
};
export default resendVerification;
