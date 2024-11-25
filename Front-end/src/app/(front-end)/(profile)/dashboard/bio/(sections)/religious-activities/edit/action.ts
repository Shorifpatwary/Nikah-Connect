"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/edit/data"; // Update path to the religious activity data
import { ReligiousActivityEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/edit/form"; // Update path to the religious activity schema
import {
  allBio,
  backendUrl,
  filledMarks,
  religiousActivities,
} from "@/assets/data/config/app.config"; // Add `religiousActivities` to config
import { ReligiousActivityFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for religious activity
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType =
  ReligiousActivityFormInterface<ReligiousActivityEditSchemaType>;

type Props<T> = {
  data: T;
  id: number; // Adding the `id` to identify the bio for updating
  setError: UseFormSetError<ReligiousActivityEditSchemaType>;
  reset: UseFormReset<ReligiousActivityEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioReligiousActivity = async <T>({
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
    // Make fetch request to update religious activity section
    const url = `${backendUrl}/api/bio/religious-activities/${id}`; // Update the endpoint to use PUT and include the id for the specific record
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update the resource
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${religiousActivities}_${userId}`, // Cache revalidation for religious activities info
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
        Record<keyof ReligiousActivityEditSchemaType, string[]>
      >;
      (
        Object.keys(errors) as (keyof ReligiousActivityEditSchemaType)[]
      ).forEach(fieldName => {
        setError(fieldName, {
          type: "server",
          message: errors[fieldName]?.[0] || "Validation error",
        });
      });
    }
    // Handle unknown errors
    else {
      toast({
        title: Data.unKnownError.title,
        variant: "destructive",
        description: Data.unKnownError.description,
      });
    }
  } catch (error) {
    console.log(error, "error on religious activity update");
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
