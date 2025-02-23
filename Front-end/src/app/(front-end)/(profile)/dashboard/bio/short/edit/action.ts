"use client";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/short/data";
import { BioShortEditSchemaType } from "@/app/(front-end)/(profile)/dashboard/bio/short/edit/form";
import {
  allBio,
  backendUrl,
  filledMarks,
  shortBios,
} from "@/assets/data/config/app.config";
import {
  ShortBioFormInterface,
  ShortBioInterface,
} from "@/assets/data/response-types/bio";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";
type ResponseType = ShortBioFormInterface<BioShortEditSchemaType>;

type Props<T> = {
  data: T;
  bio: ShortBioInterface | null;
  setError: UseFormSetError<BioShortEditSchemaType>;
  toast: (props: Toast) => void;
  router: AppRouterInstance;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
};

export const editShortBio = async <T>({
  data,
  bio,
  setError,
  toast,
  router,
  setIsFormLoading,
}: Props<T>) => {
  try {
    setIsFormLoading(true);
    // Make fetch request to register user
    const url = `${backendUrl}/api/bio/short/${bio?.id}`;
    const response = await fetchRequest<ResponseType>({
      url,
      options: {
        method: "PUT",
        body: JSON.stringify(data),
      },
      tagRevalidate: [
        `${allBio}_${bio?.id}`,
        `${shortBios}_${bio?.id}`,
        `${filledMarks}_${bio?.id}`,
      ],
    });
    // If there are errors in the response, set each error using setError
    if (response.status === 200 || response.status === 201) {
      toast({
        title: Data.edit.success.title,
        variant: "primary",
        description: Data.edit.success.description,
      });
      // Todo:  reset(); Edit form can't be reset.
      router.push(Data.edit.success.redirectUrl);
    } else if (response.status === 422) {
      const errors = response?.data?.errors as Partial<
        Record<keyof BioShortEditSchemaType, string[]>
      >;
      (Object.keys(errors) as (keyof BioShortEditSchemaType)[]).forEach(
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
    console.log(error, "error");
    toast({
      title: Data.unKnownError.title,
      variant: "destructive",
      description: Data.unKnownError.description,
    });
  } finally {
    setIsFormLoading(false);
  }
};
