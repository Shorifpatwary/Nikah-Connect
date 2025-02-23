"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/data"; // Update path to the expected partner data
import { ExpectedPartnerEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/edit/form"; // Update path to the schema
import {
  allBio,
  backendUrl,
  expectedPartner,
  filledMarks,
} from "@/assets/data/config/app.config"; // Add `expectedPartner` to config
import {
  BioWithExpectedPartner,
  ExpectedPartnerFormInterface,
} from "@/assets/data/response-types/bio"; // Define the response type for expected partner
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = ExpectedPartnerFormInterface<ExpectedPartnerEditSchemaType>;

type Props<T> = {
  data: T;
  bio: BioWithExpectedPartner | null;
  setError: UseFormSetError<ExpectedPartnerEditSchemaType>;
  reset: UseFormReset<ExpectedPartnerEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateExpectedPartner = async <T>({
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
    // Construct the URL for the expected partner info update
    const url = `${backendUrl}/api/bio/expected-partner/${bio?.expected_partner?.id}`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT for update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${expectedPartner}_${bio?.id}`, // Cache revalidation for expected partner info
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
      }
      router.push(Data.edit.success.redirectUrl);
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
