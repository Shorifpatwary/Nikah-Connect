// ! let them to be client component,  where getCsrfCookie() are in used.
"use client";
import { createCookie } from "@/app/(front-end)/(auth)/authCookie";
import { formData } from "@/app/(front-end)/(auth)/data";
import getCsrfCookie from "@/app/(front-end)/(auth)/get-csrf";
import { RegistrationSchemaType } from "@/app/(front-end)/(auth)/register/registration-form";
import { allUsersTag, backendUrl } from "@/assets/data/config/app.config";
import { UserFormInterface } from "@/assets/data/response-types/users";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
type ResponseType = UserFormInterface<RegistrationSchemaType>;

type Props<T> = {
  data: T;
  setError: UseFormSetError<RegistrationSchemaType>;
  reset: UseFormReset<RegistrationSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createUser = async <T>({
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
    const url = `${backendUrl}/register`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [allUsersTag],
    });
    // If there are errors in the response, set each error using setError
    if (response.status === 200) {
      toast({
        title: formData.register.success.title,
        variant: "primary",
        description: formData.register.success.description,
      });
      reset();

      await createCookie(response.data);
      // redirect
      router.push(formData.register.success.redirectUrl);
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof RegistrationSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof RegistrationSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0],
          });
        }
      );
      toast({
        title: formData.register.error.title,
        variant: "destructive",
        description: formData.register.error.description,
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
