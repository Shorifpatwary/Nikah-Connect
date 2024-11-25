"use client";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection"; // Add fetching function
import { updateHiddenInfo } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/edit/action"; // Update with the edit action
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/edit/data"; // Adjust path to edit data
import { HiddenInfoInterface } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
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
  name: string([
    minLength(1, VM.name.required),
    minLength(2, VM.name.minLength),
    maxLength(255, VM.name.maxLength),
  ]),
  email: string([
    minLength(1, VM.email.required),
    minLength(5, VM.email.minLength),
    maxLength(255, VM.email.maxLength),
  ]),
  location: string([
    minLength(1, VM.location.required),
    minLength(5, VM.location.minLength),
    maxLength(1000, VM.location.maxLength),
  ]),
  family_members_name: string([
    minLength(1, VM.family_members_name.required),
    minLength(5, VM.family_members_name.minLength),
    maxLength(1000, VM.family_members_name.maxLength),
  ]),
  current_parent: string([
    minLength(1, VM.current_parent.required),
    minLength(2, VM.current_parent.minLength),
    maxLength(255, VM.current_parent.maxLength),
  ]),
  parent_mobile: string([
    minLength(1, VM.parent_mobile.required),
    minLength(10, VM.parent_mobile.minLength),
    maxLength(25, VM.parent_mobile.maxLength),
  ]),
  social_links: string([maxLength(1000, VM.social_links.maxLength)]),
  permanent_address_map_location: string([
    maxLength(255, VM.permanent_address_map_location.maxLength),
  ]),
  present_address_map_location: string([
    maxLength(255, VM.present_address_map_location.maxLength),
  ]),
  documents_links: string([maxLength(100, VM.documents_links.maxLength)]),
});

export type HiddenInfoEditSchemaType = Output<typeof Schema>;

const HiddenInfoEditForm = () => {
  // Accept bioId as a prop
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [hiddenInfo, setHiddenInfo] = useState<HiddenInfoInterface | null>(
    null
  ); // State to store fetched bio data

  useEffect(() => {
    fetchBioSection("hidden-info", setHiddenInfo);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<HiddenInfoEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  useEffect(() => {
    if (hiddenInfo) {
      // Set form values once hiddenInfo is fetched
      Object.entries(hiddenInfo).forEach(([key, value]) => {
        setValue(key as keyof HiddenInfoEditSchemaType, value || "");
      });
    }
  }, [hiddenInfo, setValue]);

  const onSubmit: SubmitHandler<HiddenInfoEditSchemaType> = async formData => {
    setIsFormLoading(true);
    await updateHiddenInfo({
      data: formData,
      // @ts-expect-error
      id: hiddenInfo?.id,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  if (!hiddenInfo) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* Name */}
        <TextInputBox
          label={Data.inputs.name.title}
          labelRequired={true}
          suggestions={Data.inputs.name.suggestions}
          errorMessage={errors.name?.message}
          fieldName="name"
          register={register("name")}
        />

        {/* Email */}
        <TextInputBox
          label={Data.inputs.email.title}
          labelRequired={true}
          type="email"
          suggestions={Data.inputs.email.suggestions}
          errorMessage={errors.email?.message}
          fieldName="email"
          register={register("email")}
        />

        {/* Location */}
        <TextareaBox
          label={Data.inputs.location.title}
          labelRequired={true}
          suggestions={Data.inputs.location.suggestions}
          errorMessage={errors.location?.message}
          fieldName="location"
          register={register("location")}
        />

        {/* Family Members Name */}
        <TextareaBox
          label={Data.inputs.family_members_name.title}
          labelRequired={true}
          suggestions={Data.inputs.family_members_name.suggestions}
          errorMessage={errors.family_members_name?.message}
          fieldName="family_members_name"
          register={register("family_members_name")}
        />

        {/* Current Parent */}
        <TextInputBox
          label={Data.inputs.current_parent.title}
          labelRequired={true}
          errorMessage={errors.current_parent?.message}
          fieldName="current_parent"
          register={register("current_parent")}
        />

        {/* Parent Mobile */}
        <TextInputBox
          label={Data.inputs.parent_mobile.title}
          labelRequired={true}
          suggestions={Data.inputs.parent_mobile.suggestions}
          errorMessage={errors.parent_mobile?.message}
          fieldName="parent_mobile"
          register={register("parent_mobile")}
        />

        {/* Social Links */}
        <TextareaBox
          label={Data.inputs.social_links.title}
          suggestions={Data.inputs.social_links.suggestions}
          errorMessage={errors.social_links?.message}
          fieldName="social_links"
          register={register("social_links")}
        />

        {/* Permanent Address Map Location */}
        <TextInputBox
          label={Data.inputs.permanent_address_map_location.title}
          suggestions={Data.inputs.permanent_address_map_location.suggestions}
          errorMessage={errors.permanent_address_map_location?.message}
          fieldName="permanent_address_map_location"
          register={register("permanent_address_map_location")}
        />

        {/* Present Address Map Location */}
        <TextInputBox
          label={Data.inputs.present_address_map_location.title}
          suggestions={Data.inputs.present_address_map_location.suggestions}
          fieldName="present_address_map_location"
          register={register("present_address_map_location")}
        />

        {/* Documents Links */}
        <TextInputBox
          label={Data.inputs.documents_links.title}
          suggestions={Data.inputs.documents_links.suggestions}
          errorMessage={errors.documents_links?.message}
          fieldName="documents_links"
          register={register("documents_links")}
        />

        {/* Submit */}
        <Button
          className="mt-3 w-full text-base"
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

export default HiddenInfoEditForm;
