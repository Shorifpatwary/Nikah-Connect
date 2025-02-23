"use client";

import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/data";
import { LocationEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/edit/form";
import {
  allBio,
  backendUrl,
  filledMarks,
  locations,
} from "@/assets/data/config/app.config";
import {
  BioWithLocationSection,
  LocationFormInterface,
} from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = LocationFormInterface<LocationEditSchemaType>;

type Props<T> = {
  data: T;
  bio: BioWithLocationSection | null;
  setError: UseFormSetError<LocationEditSchemaType>;
  reset: UseFormReset<LocationEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioLocation = async <T>({
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
    // Make fetch request to update bio location
    const url = `${backendUrl}/api/bio/location/${bio?.location_section?.id}`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT", // Update request using PUT
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${locations}_${bio?.id}`,
        `${filledMarks}_${bio?.id}`,
      ],
    });
    // Handle response
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.edit.success.title,
        variant: "primary",
        description: Data.edit.success.description,
      });
      reset();
      // redirect conditionally for short to long bio mover
      if (bio?.type === "SHORT_TO_LONG_DRAFT") {
        router.push(Data.edit.success.shortToLongRedirect);
      } else {
        router.push(Data.edit.success.redirectUrl);
      }
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
        title: Data.edit.error[422].title,
        variant: "destructive",
        description: Data.edit.error[422].description,
      });
    } else {
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
