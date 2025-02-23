"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/data"; // Update path to hidden-info data
import { HiddenInfoEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/edit/form"; // Update path to the hidden-info schema
import {
  allBio,
  backendUrl,
  filledMarks,
  hiddenInfo,
} from "@/assets/data/config/app.config"; // Add `hiddenInfo` to config
import {
  BioWithHiddenInfos,
  HiddenInfoFormInterface,
} from "@/assets/data/response-types/bio"; // Define the response type for hidden info
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = HiddenInfoFormInterface<HiddenInfoEditSchemaType>;

type Props<T> = {
  data: T;
  bio: BioWithHiddenInfos | null;
  setError: UseFormSetError<HiddenInfoEditSchemaType>;
  reset: UseFormReset<HiddenInfoEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateHiddenInfo = async <T>({
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
    // Make fetch request to update hidden info
    const url = `${backendUrl}/api/bio/hidden-info/${bio?.hidden_info?.id}`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${hiddenInfo}_${bio?.id}`,
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
      // ! don't need to redirect conditionally. This is last.
      router.push(Data.edit.success.redirectUrl);
    }
    // Handle validation errors
    else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof HiddenInfoEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof HiddenInfoEditSchemaType)[]).forEach(
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
