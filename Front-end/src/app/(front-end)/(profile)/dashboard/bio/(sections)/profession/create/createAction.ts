"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/create/data"; // Update path to the profession data
import { ProfessionCreateSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/create/form"; // Update path to the profession schema
import {
  allBio,
  backendUrl,
  filledMarks,
  professionInfo,
} from "@/assets/data/config/app.config"; // Add `professionInfo` to config
import { ProfessionFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for profession
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = ProfessionFormInterface<ProfessionCreateSchemaType>; // Use profession info interface

type Props<T> = {
  data: T;
  setError: UseFormSetError<ProfessionCreateSchemaType>;
  reset: UseFormReset<ProfessionCreateSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createBioProfession = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to bio profession info
    const url = `${backendUrl}/api/bio/profession`; // Update endpoint for profession
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${professionInfo}_${userId}`, // Use `professionInfo` for cache validation
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
        Record<keyof ProfessionCreateSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof ProfessionCreateSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Invalid value",
          });
        }
      );
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
        title: Data.unKnownError.title,
        variant: "destructive",
        description: Data.unKnownError.description,
      });
    }
  } catch (error) {
    console.log(error, "error");
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
