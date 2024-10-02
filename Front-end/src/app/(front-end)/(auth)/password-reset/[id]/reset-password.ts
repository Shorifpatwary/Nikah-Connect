import { formData } from "@/app/(front-end)/(auth)/data";
import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";
import { ResetSchemaType } from "@/app/(front-end)/(auth)/password-reset/[id]/form";

import { backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
type ResponseType = UserFormInterface<ResetSchemaType>;
type Props<T> = {
  data: T;
  setError: UseFormSetError<ResetSchemaType>;
  reset: UseFormReset<ResetSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};
const ResetPassword = async <T>({
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
    const url = `${backendUrl}/reset-password`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });
    // handle response
    if (response.status === 200) {
      toast({
        title: formData.resetPassword.success.title,
        variant: "primary",
        description: formData.resetPassword.success.description,
      });
      reset();
      // redirect
      router.push(formData.resetPassword.success.redirectUrl);
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof ResetSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof ResetSchemaType)[]).forEach(fieldName => {
        setError(fieldName, {
          type: "server",
          message: errors[fieldName]?.[0],
        });
      });
      toast({
        title: formData.resetPassword.error.title,
        variant: "destructive",
        description: formData.resetPassword.error.description,
      });
    } else {
      toast({
        title: formData.unKnownError.title,
        variant: "destructive",
        description: formData.unKnownError.description,
      });
    }
  } catch (error) {}
};
export default ResetPassword;
