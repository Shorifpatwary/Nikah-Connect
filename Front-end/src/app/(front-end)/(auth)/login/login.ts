// ! let them to be client component,  where getCsrfCookie() are in used.
"use client";
import { createCookie } from "@/app/(front-end)/(auth)/authCookie";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";
import { LoginSchemaType } from "@/app/(front-end)/(auth)/login/login-form";

import { formData } from "@/app/(front-end)/(auth)/data";
import { backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
type ResponseType = UserFormInterface<LoginSchemaType>;
type Props<T> = {
  data: T;
  setError: UseFormSetError<LoginSchemaType>;
  reset: UseFormReset<LoginSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const Login = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to set CSRF cookie
    await getCsrfCookie();

    // Make fetch request to register user
    const url = `${backendUrl}/login`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });
    if (response.status === 200) {
      toast({
        title: formData.login.success.title,
        variant: "primary",
        description: formData.login.success.description,
      });
      reset();
      createCookie(response.data);

      // ! redirect after 2 second when working with toast along with router/redirect
      setTimeout(() => {
        router.push(formData.login.success.redirectUrl);
      }, 2000);
    } else if (response.status === 422) {
      (
        Object.keys(response?.data.errors as {}) as (keyof LoginSchemaType)[]
      ).forEach(fieldName => {
        setError(fieldName, {
          type: "server",
          message: response.data.errors?.[fieldName]?.[0],
        });
      });

      toast({
        title: formData.login.error.title,
        variant: "destructive",
        description: formData.login.error.description,
      });
    } else {
      toast({
        title: formData.unKnownError.title,
        variant: "destructive",
        description: formData.unKnownError.description,
      });
    }
  } catch (error) {
    toast({
      title: formData.unKnownError.title,
      variant: "destructive",
      description: formData.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
