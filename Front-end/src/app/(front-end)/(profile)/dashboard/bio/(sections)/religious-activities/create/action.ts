"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/create/data";
import { ReligiousActivityCreateSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/create/form";
import {
  allBio,
  backendUrl,
  filledMarks,
  religiousActivities,
} from "@/assets/data/config/app.config";
import { ReligiousActivityFormInterface } from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType =
  ReligiousActivityFormInterface<ReligiousActivityCreateSchemaType>; // Use religious activity info interface

type Props<T> = {
  data: T;
  setError: UseFormSetError<ReligiousActivityCreateSchemaType>;
  reset: UseFormReset<ReligiousActivityCreateSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createBioReligiousActivity = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to bio religious activity info
    const url = `${backendUrl}/api/bio/religious-activities`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${religiousActivities}_${userId}`,
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
        Record<keyof ReligiousActivityCreateSchemaType, string[]>
      >;
      (
        Object.keys(errors) as (keyof ReligiousActivityCreateSchemaType)[]
      ).forEach(fieldName => {
        setError(fieldName, {
          type: "server",
          message: errors[fieldName]?.[0] || "Invalid value",
        });
      });
      toast({
        title: Data.error[422].title,
        variant: "destructive",
        description: Data.error[422].description,
      });
    }
    // Handle authorization error
    else if (response.status === 403) {
      toast({
        title: Data.error[403].title,
        variant: "destructive",
        description: Data.error[403].description,
      });
    }
    // Handle unknown error
    else {
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
