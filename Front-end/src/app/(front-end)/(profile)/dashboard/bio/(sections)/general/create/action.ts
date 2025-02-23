"use client";
import { GeneralCreateSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/data";
import {
  allBio,
  backendUrl,
  filledMarks,
  generals,
} from "@/assets/data/config/app.config";
import { GeneralFormInterface } from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
type ResponseType = GeneralFormInterface<GeneralCreateSchemaType>;

type Props<T> = {
  data: T;
  setError: UseFormSetError<GeneralCreateSchemaType>;
  reset: UseFormReset<GeneralCreateSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createBioGeneral = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to register user
    const url = `${backendUrl}/api/bio/general`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${generals}_${userId}`,
        `${filledMarks}_${userId}`,
      ],
    });
    // If there are errors in the response, set each error using setError
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.create.success.title,
        variant: "primary",
        description: Data.create.success.description,
      });
      reset();

      router.push(Data.create.success.redirectUrl);
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof GeneralCreateSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof GeneralCreateSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Invalid value",
          });
        }
      );
      toast({
        title: Data.create.error[422].title,
        variant: "destructive",
        description: Data.create.error[422].description,
      });
    } else if (response.status === 403) {
      toast({
        title: Data.create.error[403].title,
        variant: "destructive",
        description: Data.create.error[403].description,
      });
      // redirect to the edit page.
      router.push(Data.create.error[403].redirectUrl);
    } else {
      toast({
        title: response.data.error
          ? `${response.data.error}`
          : Data.unKnownError.title,
        variant: "destructive",
        description: response.data.error
          ? `${Data.create.error.tryAgainDescription}`
          : Data.unKnownError.description,
      });
    }
  } catch (error) {
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
