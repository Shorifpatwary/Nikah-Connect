"use client";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import { updateBioPersonalDetails } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/edit/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/edit/data";
import { PersonalDetailsSectionInterface } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { maxLength, minLength, object, Output, string } from "valibot";

// Valibot schema
const Schema = object({
  about_yourself: string([
    minLength(1, VM.about_yourself.required),
    minLength(10, VM.about_yourself.minLength),
    maxLength(2500, VM.about_yourself.maxLength),
  ]),
  outdoor_clothing: string([
    minLength(1, VM.outdoor_clothing.required),
    minLength(10, VM.outdoor_clothing.minLength),
    maxLength(1000, VM.outdoor_clothing.maxLength),
  ]),
  physical_mental_illness: string([
    minLength(1, VM.physical_mental_illness.required),
    minLength(10, VM.physical_mental_illness.minLength),
    maxLength(1000, VM.physical_mental_illness.maxLength),
  ]),
  favorite_books: string([maxLength(1000, VM.favorite_books.maxLength)]),
  favorite_online_personalities: string([
    maxLength(1000, VM.favorite_online_personalities.maxLength),
  ]),
  device_usage_time: string([maxLength(1000, VM.device_usage_time.maxLength)]),
  affiliations: string([maxLength(1000, VM.affiliations.maxLength)]),
});

export type PersonalDetailsEditSchemaType = Output<typeof Schema>;

const BioPersonalDetailsEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [personalDetails, setPersonalDetails] =
    useState<PersonalDetailsSectionInterface | null>(null);

  useEffect(() => {
    fetchBioSection<PersonalDetailsSectionInterface>(
      "personal-info",
      setPersonalDetails
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<PersonalDetailsEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  useEffect(() => {
    if (personalDetails) {
      Object.entries(personalDetails).forEach(([key, value]) => {
        setValue(key as keyof PersonalDetailsEditSchemaType, value || "");
      });
    }
  }, [personalDetails, setValue]);

  const onSubmit: SubmitHandler<
    PersonalDetailsEditSchemaType
  > = async formData => {
    await updateBioPersonalDetails<PersonalDetailsEditSchemaType>({
      data: formData,
      // @ts-expect-error
      id: personalDetails?.id,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  if (!personalDetails) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* About Yourself */}
        <TextareaBox
          label={Data.inputs.about_yourself.title}
          labelRequired={true}
          errorMessage={errors.about_yourself?.message}
          fieldName="about_yourself"
          placeholder={Data.inputs.about_yourself.placeholder}
          suggestions={Data.inputs.about_yourself.suggestions}
          register={register("about_yourself")}
        />

        {/* Outdoor Clothing */}
        <TextareaBox
          label={Data.inputs.outdoor_clothing.title}
          labelRequired={true}
          errorMessage={errors.outdoor_clothing?.message}
          fieldName="outdoor_clothing"
          placeholder={Data.inputs.outdoor_clothing.placeholder}
          suggestions={Data.inputs.outdoor_clothing.suggestions}
          register={register("outdoor_clothing")}
        />

        {/* Physical/Mental Illness */}
        <TextareaBox
          label={Data.inputs.physical_mental_illness.title}
          labelRequired={true}
          errorMessage={errors.physical_mental_illness?.message}
          fieldName="physical_mental_illness"
          placeholder={Data.inputs.physical_mental_illness.placeholder}
          suggestions={Data.inputs.physical_mental_illness.suggestions}
          register={register("physical_mental_illness")}
        />

        {/* Favorite Books */}
        <TextareaBox
          label={Data.inputs.favorite_books.title}
          errorMessage={errors.favorite_books?.message}
          fieldName="favorite_books"
          placeholder={Data.inputs.favorite_books.placeholder}
          suggestions={Data.inputs.favorite_books.suggestions}
          register={register("favorite_books")}
        />

        {/* Favorite Online Personalities */}
        <TextareaBox
          label={Data.inputs.favorite_online_personalities.title}
          errorMessage={errors.favorite_online_personalities?.message}
          fieldName="favorite_online_personalities"
          placeholder={Data.inputs.favorite_online_personalities.placeholder}
          suggestions={Data.inputs.favorite_online_personalities.suggestions}
          register={register("favorite_online_personalities")}
        />

        {/* Device Usage Time */}
        <TextareaBox
          label={Data.inputs.device_usage_time.title}
          errorMessage={errors.device_usage_time?.message}
          fieldName="device_usage_time"
          placeholder={Data.inputs.device_usage_time.placeholder}
          suggestions={Data.inputs.device_usage_time.suggestions}
          register={register("device_usage_time")}
        />

        {/* Affiliations */}
        <TextareaBox
          label={Data.inputs.affiliations.title}
          errorMessage={errors.affiliations?.message}
          fieldName="affiliations"
          placeholder={Data.inputs.affiliations.placeholder}
          suggestions={Data.inputs.affiliations.suggestions}
          register={register("affiliations")}
        />

        {/* Submit */}
        <Button
          className={`mt-3 w-full text-base`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader /> : Data.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default BioPersonalDetailsEditForm;
