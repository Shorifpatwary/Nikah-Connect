import axios from "@/lib/axois";

const resendVerification = async () => {
  try {
    // Make fetch request to register user
    const response = await axios.post("/email/verification-notification");
    return response;
  } catch (error) {
    return {
      error: `SERVER ERROR ${error}`,
    };
  }
};
export default resendVerification;
