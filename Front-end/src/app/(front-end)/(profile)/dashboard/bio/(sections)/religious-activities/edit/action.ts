"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/data"; // Update path to the religious activity data
import { ReligiousActivityEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/edit/form"; // Update path to the religious activity schema
import {
  allBio,
  backendUrl,
  filledMarks,
  religiousActivities,
} from "@/assets/data/config/app.config";
import {
  BioWithReligiousActivity,
  ReligiousActivityFormInterface,
} from "@/assets/data/response-types/bio"; // Define the response type for religious activity
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType =
  ReligiousActivityFormInterface<ReligiousActivityEditSchemaType>;

type Props<T> = {
  data: T;
  bio: BioWithReligiousActivity | null;
  setError: UseFormSetError<ReligiousActivityEditSchemaType>;
  reset: UseFormReset<ReligiousActivityEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioReligiousActivity = async <T>({
  data,
  bio,
  setError,
  reset,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to update religious activity section
    const url = `${backendUrl}/api/bio/religious-activities/${bio?.religious_activity?.id}`; // Update the endpoint to use PUT and include the id for the specific record

    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update the resource
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${religiousActivities}_${bio?.id}`, // Cache revalidation for religious activities info
        `${filledMarks}_${bio?.id}`,
      ],
    });

    // Handle success response
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.edit.success.title,
        variant: "primary",
        description: Data.edit.success.description,
      });
      reset(); // Reset form data after successful update

      // redirect conditionally for short to long bio mover
      if (bio?.type === "SHORT_TO_LONG_DRAFT") {
        router.push(Data.edit.success.shortToLongRedirect);
      } else {
        router.push(Data.edit.success.redirectUrl);
      }
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
        title: response.data.error
          ? `${response.data.error}`
          : Data.unKnownError.title,
        variant: "destructive",
        description: response.data.error
          ? `${Data.edit.error.tryAgainDescription}`
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
