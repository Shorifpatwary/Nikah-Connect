"use client";

import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/data"; // Update path to the personal details data
import { PersonalDetailsEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/edit/form"; // Update path to the personal details schema
import {
  allBio,
  backendUrl,
  filledMarks,
  personalDetails,
} from "@/assets/data/config/app.config"; // Add `personalDetails` to config
import {
  BioWithPersonalDetails,
  PersonalDetailsFormInterface,
} from "@/assets/data/response-types/bio"; // Define the response type for personal details
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = PersonalDetailsFormInterface<PersonalDetailsEditSchemaType>;

type Props<T> = {
  data: T;
  bio: BioWithPersonalDetails | null;
  setError: UseFormSetError<PersonalDetailsEditSchemaType>;
  reset: UseFormReset<PersonalDetailsEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioPersonalDetails = async <T>({
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
    // Make fetch request to update personal details
    const url = `${backendUrl}/api/bio/personal-details/${bio?.personal_details?.id}`; // Update endpoint for updating personal details
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${personalDetails}_${bio?.id}`,
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
        Record<keyof PersonalDetailsEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof PersonalDetailsEditSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Validation error",
          });
        }
      );
      toast({
        title: Data.edit.error[422].title,
        variant: "destructive",
        description: Data.edit.error[422].description,
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
