"use client";
import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { backendUrl } from "@/assets/data/config/app.config";
import Routes from "@/assets/data/route";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

type Props = {
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const Logout = async ({ toast, router, setIsLoading }: Props) => {
  try {
    setIsLoading(true);

    // Make fetch request to log out user
    // const response = await LogOutAction();

    const url = `${backendUrl}/logout`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
      },
    });

    if (response.status === 200) {
      toast({
        title: "Logout Successful",
        variant: "primary",
        description: "You have been logged out successfully.",
      });
      deleteAuthCookies();
      // Redirect to home page or login page
      router.push(Routes.Login);
    } else {
      toast({
        title: "Logout Failed",
        variant: "destructive",
        description: "Failed to log out. Please try again.",
      });
    }
  } catch (error) {
    toast({
      title: "Unknown Error",
      variant: "destructive",
      description: "An unknown error occurred. Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};
