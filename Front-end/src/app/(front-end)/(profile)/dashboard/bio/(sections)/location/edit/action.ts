"use client";

import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/edit/data";
import { LocationEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/edit/form";
import {
  allBio,
  backendUrl,
  filledMarks,
  locations,
} from "@/assets/data/config/app.config";
import { LocationFormInterface } from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = LocationFormInterface<LocationEditSchemaType>;

type Props<T> = {
  data: T;
  id: number;
  setError: UseFormSetError<LocationEditSchemaType>;
  reset: UseFormReset<LocationEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioLocation = async <T>({
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
    // Make fetch request to update bio location
    const url = `${backendUrl}/api/bio/location/${id}`;
    const userId = getAuthUserIdFromClientCookies();
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Update request using PUT
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${userId}`,
        `${locations}_${userId}`,
        `${filledMarks}_${userId}`,
      ],
    });

    // Handle response
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.success.title,
        variant: "primary",
        description: Data.success.description,
      });
      reset();

      router.push(Data.success.redirectUrl);
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof LocationEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof LocationEditSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Invalid value",
          });
        }
      );
      toast({
        title: Data.error[422].title,
        variant: "destructive",
        description: Data.error[422].description,
      });
    } else {
      toast({
        title: Data.unKnownError.title,
        variant: "destructive",
        description: Data.unKnownError.description,
      });
    }
  } catch (error) {
    console.error(error, "error");
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
