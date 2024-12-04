"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/edit/data"; // Update path to hidden-info data
import { HiddenInfoEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/edit/form"; // Update path to the hidden-info schema
import {
  allBio,
  backendUrl,
  filledMarks,
  hiddenInfo,
} from "@/assets/data/config/app.config"; // Add `hiddenInfo` to config
import { HiddenInfoFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for hidden info
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = HiddenInfoFormInterface<HiddenInfoEditSchemaType>;

type Props<T> = {
  data: T;
  id: number;
  setError: UseFormSetError<HiddenInfoEditSchemaType>;
  reset: UseFormReset<HiddenInfoEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateHiddenInfo = async <T>({
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
    // Make fetch request to update hidden info
    const url = `${backendUrl}/api/bio/hidden-info/${id}`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${hiddenInfo}_${userId}`, // Cache revalidation for hidden info
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
