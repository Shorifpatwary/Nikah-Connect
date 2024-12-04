"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/edit/data"; // Update path to the family info data
import { FamilyInfoEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/edit/form"; // Update path to the family info schema
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

type ResponseType = FamilyInfoFormInterface<FamilyInfoEditSchemaType>; // Use family info interface

type Props<T> = {
  data: T;
  id: number; // Accept the ID for the specific family info record to be updated
  setError: UseFormSetError<FamilyInfoEditSchemaType>;
  reset: UseFormReset<FamilyInfoEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioFamilyInfo = async <T>({
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
    // Make fetch request to update family info
    const url = `${backendUrl}/api/bio/family-info/${id}`; // Update endpoint for updating family info
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${familyInfos}_${userId}`, // Cache revalidation for family infos
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
      reset(); // Reset form data after successful update
      router.push(Data.success.redirectUrl); // Redirect to the success page after update
    }
    // Handle validation errors
    else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof FamilyInfoEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof FamilyInfoEditSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Validation error",
          });
        }
      );
    }
    // Handle unknown errors
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
