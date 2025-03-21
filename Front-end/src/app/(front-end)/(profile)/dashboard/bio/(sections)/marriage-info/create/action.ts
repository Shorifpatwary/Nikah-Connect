"use client";
import { MarriageInfoCreateSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/data";
import {
  allBio,
  backendUrl,
  filledMarks,
  marriageInfo,
} from "@/assets/data/config/app.config";
import { MarriageInfoFormInterface } from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = MarriageInfoFormInterface<MarriageInfoCreateSchemaType>; // Use marriage info form interface

type Props<T> = {
  data: T;
  setError: UseFormSetError<MarriageInfoCreateSchemaType>;
  reset: UseFormReset<MarriageInfoCreateSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createMarriageInfo = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to marriage info
    const url = `${backendUrl}/api/bio/marriage-info`; // Update endpoint for marriage info
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${marriageInfo}_${userId}`,
        `${filledMarks}_${userId}`,
      ],
    });

    // Handle success response
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.create.success.title,
        variant: "primary",
        description: Data.create.success.description,
      });

      reset();

      router.push(Data.create.success.redirectUrl);
    }
    // Handle validation errors
    else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof MarriageInfoCreateSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof MarriageInfoCreateSchemaType)[]).forEach(
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
    }
    // Handle authorization error
    else if (response.status === 403) {
      toast({
        title: Data.create.error[403].title,
        variant: "destructive",
        description: Data.create.error[403].description,
      });
      // redirect to the edit page.
      router.push(Data.create.error[403].redirectUrl);
    }
    // Handle unknown error
    else {
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
