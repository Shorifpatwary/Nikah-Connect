"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/edit/data"; // Update path to the expected partner data
import { ExpectedPartnerEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/edit/form"; // Update path to the schema
import {
  allBio,
  backendUrl,
  expectedPartner,
  filledMarks,
} from "@/assets/data/config/app.config"; // Add `expectedPartner` to config
import { ExpectedPartnerFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for expected partner
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = ExpectedPartnerFormInterface<ExpectedPartnerEditSchemaType>;

type Props<T> = {
  data: T;
  id: number;
  setError: UseFormSetError<ExpectedPartnerEditSchemaType>;
  reset: UseFormReset<ExpectedPartnerEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateExpectedPartner = async <T>({
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
    // Construct the URL for the expected partner info update
    const url = `${backendUrl}/api/bio/expected-partner/${id}`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT for update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${expectedPartner}_${userId}`, // Cache revalidation for expected partner info
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
        Record<keyof ExpectedPartnerEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof ExpectedPartnerEditSchemaType)[]).forEach(
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
        title: Data.unKnownError.title,
        variant: "destructive",
        description: Data.unKnownError.description,
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
