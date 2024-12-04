"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/edit/data";
import { GeneralEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/edit/form";
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

type ResponseType = GeneralFormInterface<GeneralEditSchemaType>;

type Props<T> = {
  data: T;
  id: number;
  setError: UseFormSetError<GeneralEditSchemaType>;
  reset: UseFormReset<GeneralEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioGeneral = async <T>({
  data,
  id,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to update general section

    const url = `${backendUrl}/api/bio/general/${id}`; // Update endpoint for updating general section
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${generals}_${userId}`,
        `${filledMarks}_${userId}`,
      ],
    });
    // Handle success response
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.success.title,
        variant: "primary",
        description: Data.success.description,
      });
      reset();
      router.push(Data.success.redirectUrl);
    }
    // Handle validation errors
    else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof GeneralEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof GeneralEditSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Validation error",
          });
        }
      );
    } else {
      toast({
        title: response.data.error
          ? `${response.data.error}`
          : Data.unKnownError.title,
        variant: "destructive",
        description: response.data.error
          ? `${Data.error.tryAgainDescription}`
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
