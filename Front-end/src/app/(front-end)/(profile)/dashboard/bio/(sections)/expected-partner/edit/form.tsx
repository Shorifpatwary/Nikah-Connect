"use client";
import { updateExpectedPartner } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/edit/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/edit/data";
import fetchBioSection from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/fetchBioSection";
import { complexions, marital_status } from "@/assets/data/config/app.config";
import { ExpectedPartnerInterface } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import FancyMultiSelectBox from "@/components/blocks/inputBox/fancyMultiSelectBox";
import { Option } from "@/components/blocks/inputBox/selectBox";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { array, maxLength, minLength, object, Output, string } from "valibot";

// Valibot schema
const Schema = object({
  age: string([
    minLength(1, VM.age.required),
    minLength(2, VM.age.minLength),
    maxLength(250, VM.age.maxLength),
  ]),
  complexion: array(string(), [minLength(1, VM.complexion.required)]),
  height: string([
    minLength(1, VM.height.required),
    minLength(3, VM.height.minLength),
    maxLength(250, VM.height.maxLength),
  ]),
  marital_status: array(string(), [minLength(1, VM.marital_status.required)]),
  educational_qualification: string([
    minLength(1, VM.educational_qualification.required),
    minLength(10, VM.educational_qualification.minLength),
    maxLength(1000, VM.educational_qualification.maxLength),
  ]),
  profession: string([
    minLength(1, VM.profession.required),
    minLength(3, VM.profession.minLength),
    maxLength(1000, VM.profession.maxLength),
  ]),
  economic_status: string([
    minLength(1, VM.economic_status.required),
    minLength(3, VM.economic_status.minLength),
    maxLength(1000, VM.economic_status.maxLength),
  ]),
  family: string([maxLength(1000, VM.family.maxLength)]),
  about_partner: string([maxLength(2500, VM.about_partner.maxLength)]),
});

export type ExpectedPartnerEditSchemaType = Output<typeof Schema>;

const BioExpectedPartnerEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [expectedPartner, setExpectedPartner] =
    useState<ExpectedPartnerInterface | null>(null);

  useEffect(() => {
    fetchBioSection<ExpectedPartnerInterface>(
      "expected-partner",
      setExpectedPartner
    );
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
  } = useForm<ExpectedPartnerEditSchemaType>({
    resolver: valibotResolver(Schema),
  });

  const parseSelectedOptions = (
    valueString: string,
    options: Option[]
  ): Option[] => {
    if (!valueString) return [];
    // Split the string into an array, trim whitespace, and match options
    return options.filter(option =>
      valueString
        .split(",")
        .map(val => val.trim())
        .includes(option.value)
    );
  };

  useEffect(() => {
    if (expectedPartner) {
      Object.entries(expectedPartner).forEach(([key, value]) => {
        setValue(key as keyof ExpectedPartnerEditSchemaType, value || "");
      });
    }
  }, [expectedPartner, setValue]);

  const onSubmit: SubmitHandler<
    ExpectedPartnerEditSchemaType
  > = async formData => {
    await updateExpectedPartner<ExpectedPartnerEditSchemaType>({
      data: formData,
      // @ts-expect-error
      id: expectedPartner?.id,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  if (!expectedPartner) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* Age */}
        <TextareaBox
          label={Data.inputs.age.title}
          labelRequired={true}
          errorMessage={errors.age?.message}
          fieldName="age"
          placeholder={Data.inputs.age.placeholder}
          suggestions={Data.inputs.age.suggestions}
          register={register("age")}
        />
        {/* Complexion */}
        <FancyMultiSelectBox
          label={Data.inputs.complexion.title}
          labelRequired={true}
          triggerText={Data.inputs.complexion.triggerText}
          options={complexions}
          errorMessage={errors.complexion?.message}
          setValue={value =>
            setValue(
              "complexion",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            expectedPartner.complexion,
            complexions
          )}
        />
        {/* Height */}
        <TextareaBox
          label={Data.inputs.height.title}
          labelRequired={true}
          errorMessage={errors.height?.message}
          fieldName="height"
          placeholder={Data.inputs.height.placeholder}
          suggestions={Data.inputs.height.suggestions}
          register={register("height")}
        />
        {/* Marital Status */}
        <FancyMultiSelectBox
          label={Data.inputs.marital_status.title}
          labelRequired={true}
          triggerText={Data.inputs.marital_status.triggerText}
          options={marital_status}
          errorMessage={errors.marital_status?.message}
          setValue={value =>
            setValue(
              "marital_status",
              value.map(item => item.value)
            )
          }
          defaultValue={parseSelectedOptions(
            expectedPartner.marital_status,
            marital_status
          )}
        />
        {/* Educational Qualification */}
        <TextareaBox
          label={Data.inputs.educational_qualification.title}
          labelRequired={true}
          errorMessage={errors.educational_qualification?.message}
          fieldName="educational_qualification"
          placeholder={Data.inputs.educational_qualification.placeholder}
          suggestions={Data.inputs.educational_qualification.suggestions}
          register={register("educational_qualification")}
        />
        {/* Profession */}
        <TextareaBox
          label={Data.inputs.profession.title}
          labelRequired={true}
          errorMessage={errors.profession?.message}
          fieldName="profession"
          placeholder={Data.inputs.profession.placeholder}
          suggestions={Data.inputs.profession.suggestions}
          register={register("profession")}
        />
        {/* Economic Status */}
        <TextareaBox
          label={Data.inputs.economic_status.title}
          labelRequired={true}
          errorMessage={errors.economic_status?.message}
          fieldName="economic_status"
          placeholder={Data.inputs.economic_status.placeholder}
          suggestions={Data.inputs.economic_status.suggestions}
          register={register("economic_status")}
        />
        {/* Family */}
        <TextareaBox
          label={Data.inputs.family.title}
          labelRequired={false}
          errorMessage={errors.family?.message}
          fieldName="family"
          placeholder={Data.inputs.family.placeholder}
          suggestions={Data.inputs.family.suggestions}
          register={register("family")}
        />
        {/* About Partner */}
        <TextareaBox
          label={Data.inputs.about_partner.title}
          labelRequired={false}
          errorMessage={errors.about_partner?.message}
          fieldName="about_partner"
          placeholder={Data.inputs.about_partner.placeholder}
          suggestions={Data.inputs.about_partner.suggestions}
          register={register("about_partner")}
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

export default BioExpectedPartnerEditForm;
