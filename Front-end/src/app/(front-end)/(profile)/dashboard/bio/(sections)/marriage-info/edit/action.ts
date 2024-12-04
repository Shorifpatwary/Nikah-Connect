"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/edit/data"; // Update path to marriage info data
import { MarriageInfoEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/edit/form"; // Update path to the marriage info schema
import {
  allBio,
  backendUrl,
  filledMarks,
  marriageInfo,
} from "@/assets/data/config/app.config"; // Add `marriageInfo` to config
import { MarriageInfoFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for marriage info
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = MarriageInfoFormInterface<MarriageInfoEditSchemaType>;

type Props<T> = {
  data: T;
  id: number;
  setError: UseFormSetError<MarriageInfoEditSchemaType>;
  reset: UseFormReset<MarriageInfoEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateMarriageInfo = async <T>({
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
    // Make fetch request to update marriage info
    const url = `${backendUrl}/api/bio/marriage-info/${id}`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${marriageInfo}_${userId}`, // Cache revalidation for marriage info
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
        Record<keyof MarriageInfoEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof MarriageInfoEditSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Validation error",
          });
        }
      );
      toast({
        title: Data.error[422].title,
        variant: "destructive",
        description: Data.error[422].description,
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
