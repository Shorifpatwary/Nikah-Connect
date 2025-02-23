"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/data";
import { GeneralEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/edit/form";
import {
  allBio,
  backendUrl,
  filledMarks,
  generals,
} from "@/assets/data/config/app.config";
import {
  BioWithGeneralSection,
  GeneralFormInterface,
} from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

type ResponseType = GeneralFormInterface<GeneralEditSchemaType>;

type Props<T> = {
  data: T;
  bio: BioWithGeneralSection | null;
  setError: UseFormSetError<GeneralEditSchemaType>;
  reset: UseFormReset<GeneralEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const updateBioGeneral = async <T>({
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
    // Make fetch request to update general section

    const url = `${backendUrl}/api/bio/general/${bio?.general_section?.id}`; // Update endpoint for updating general section
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${generals}_${bio?.id}`,
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
      reset();
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
        Record<keyof GeneralEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof GeneralEditSchemaType)[]).forEach(
        fieldName => {
          setError(fieldName, {
            type: "server",
            message: errors[fieldName]?.[0] || "Validation error",
          });
        }
      );
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
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
