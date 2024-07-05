"use client";
import { backendUrl } from "@/assets/data/config/app.config";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setResendDisabled: Dispatch<SetStateAction<boolean>>;
  toast: (props: Toast) => void;
};
const resendVerification = async ({ setResendDisabled, toast }: Props) => {
  try {
    // Disable resend button
    setResendDisabled(true);
    // await getCsrfCookie();
    // Make fetch request to register user
    const url = `${backendUrl}/email/verification-notification`;
    // Make fetch request to register user
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
      },
    });

    if (response.status === 200) {
      toast({
        title: "সফলভাবে ই-মেইল পাঠানো হয়েছে।",
        variant: "primary",
        description:
          "আপনার ই-মেইল যাচাই করুন। এবং ই-মেইল এ দেওয়া লিংক এ ক্লিক করুন ।",
      });

      // Enable the button after 30 seconds
      setTimeout(() => {
        setResendDisabled(false);
      }, 30000);
    } else {
      setResendDisabled(false);
      toast({
        title: "ই-মেইল পাঠানো সম্ভব হয়নি। ",
        variant: "destructive",
        description:
          "আপনার নিকট ই-মেইল পাঠানো সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন। ",
      });
    }
  } catch (error) {
    setResendDisabled(false);
  }
};
export default resendVerification;
