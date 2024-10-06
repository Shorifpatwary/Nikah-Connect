"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/create/data"; // Update path to the family info data
import { FamilyInfoCreateSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/create/form"; // Update path to the family info schema
import {
  allBio,
  backendUrl,
  familyInfos,
  filledMarks,
} from "@/assets/data/config/app.config"; // Add `familyInfos` to config
import { FamilyInfoFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for family info
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = FamilyInfoFormInterface<FamilyInfoCreateSchemaType>; // Use family info interface

type Props<T> = {
  data: T;
  setError: UseFormSetError<FamilyInfoCreateSchemaType>;
  reset: UseFormReset<FamilyInfoCreateSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const createBioFamilyInfo = async <T>({
  data,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to bio family info
    const url = `${backendUrl}/api/bio/family-info`; // Update endpoint for family info
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "POST",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${familyInfos}_${userId}`, // Use `familyInfos` for cache validation
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
        Record<keyof FamilyInfoCreateSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof FamilyInfoCreateSchemaType)[]).forEach(
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
