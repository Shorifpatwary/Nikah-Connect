"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/create/data"; // Update path to the education data
import { EducationCreateSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/create/form"; // Update path to the education schema
import {
  allBio,
  backendUrl,
  educations,
  filledMarks,
} from "@/assets/data/config/app.config"; // Add `educations` to config
import { EducationFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for education
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = EducationFormInterface<EducationCreateSchemaType>; // Use education interface

type Props<T> = {
  data: T;
  setError: UseFormSetError<EducationCreateSchemaType>;
  reset: UseFormReset<EducationCreateSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createBioEducation = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to bio education
    const url = `${backendUrl}/api/bio/education`; // Update endpoint for education
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${educations}_${userId}`, // Use `educations` for cache validation
        `${filledMarks}_${userId}`,
      ],
    });
    // If there are errors in the response, set each error using setError
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.success.title,
        variant: "primary",
        description: Data.success.description,
      });
      reset();

      router.push(Data.success.redirectUrl); // Redirect to the success URL defined in `data`
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof EducationCreateSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof EducationCreateSchemaType)[]).forEach(
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
    } else if (response.status === 403) {
      toast({
        title: Data.error[403].title,
        variant: "destructive",
        description: Data.error[403].description,
      });
    } else {
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
