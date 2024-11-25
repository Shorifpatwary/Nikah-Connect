"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/edit/data"; // Update path to the profession data
import { ProfessionEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/edit/form"; // Update path to the profession schema
import {
  allBio,
  backendUrl,
  filledMarks,
  professionInfo,
} from "@/assets/data/config/app.config"; // Add `professionInfo` to config
import { ProfessionFormInterface } from "@/assets/data/response-types/bio"; // Define the response type for profession
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = ProfessionFormInterface<ProfessionEditSchemaType>;

type Props<T> = {
  data: T;
  id: number;
  setError: UseFormSetError<ProfessionEditSchemaType>;
  reset: UseFormReset<ProfessionEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioProfession = async <T>({
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
    // Make fetch request to update profession section
    const url = `${backendUrl}/api/bio/profession/${id}`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Use PUT method to update
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${professionInfo}_${userId}`, // Cache revalidation for profession info
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
        Record<keyof ProfessionEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof ProfessionEditSchemaType)[]).forEach(
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
    console.log(error, "error on profession edit form action");
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
