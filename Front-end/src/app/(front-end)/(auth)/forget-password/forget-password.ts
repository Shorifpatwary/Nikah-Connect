import { formData } from "@/app/(front-end)/(auth)/data";
import { ForgetSchemaType } from "@/app/(front-end)/(auth)/forget-password/forget-form";
import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";

import { backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
type ResponseType = UserFormInterface<ForgetSchemaType>;

type Props<T> = {
  data: T;
  setError: UseFormSetError<ForgetSchemaType>;
  reset: UseFormReset<ForgetSchemaType>;
  toast: (props: Toast) => void;
  router?: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

const ForgetPassword = async <T>({
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
    const url = `${backendUrl}/forgot-password`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });

    // If there are errors in the response, set each error using setError
    if (response.status === 200) {
      toast({
        title: formData.forgetPassword.success.title,
        variant: "primary",
        description: formData.forgetPassword.success.description,
      });
      reset();
      // redirect
      //   router.push(formData.register.success.redirectUrl);
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof ForgetSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof ForgetSchemaType)[]).forEach(fieldName => {
        setError(fieldName, {
          type: "server",
          message: errors[fieldName]?.[0],
        });
      });
      toast({
        title: formData.forgetPassword.error.title,
        variant: "destructive",
        description: formData.forgetPassword.error.description,
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
export default ForgetPassword;
