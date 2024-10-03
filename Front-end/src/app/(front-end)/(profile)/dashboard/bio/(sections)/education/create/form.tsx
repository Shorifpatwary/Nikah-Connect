"use client";
import { createBioEducation } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/create/createAction";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/create/data";
import { education_mediums } from "@/assets/data/config/app.config";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import SelectBox from "@/components/blocks/inputBox/selectBox";
import TextareaBox from "@/components/blocks/inputBox/TextareaBox";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  maxLength,
  minLength,
  object,
  Output,
  picklist,
  string,
} from "valibot";

// Valibot schema
const Schema = object({
  education_medium: picklist(
    education_mediums.map(item => item.value),
    VM.education_medium.required
  ),
  highest_qualification: string([
    minLength(1, VM.highest_qualification.required),
    minLength(5, VM.highest_qualification.minLength),
    maxLength(1000, VM.highest_qualification.maxLength),
  ]),
  current_study: string([maxLength(1000, VM.current_study.maxLength)]),
  previous_exams: string([
    minLength(1, VM.previous_exams.required),
    minLength(50, VM.previous_exams.minLength),
    maxLength(2500, VM.previous_exams.maxLength),
  ]),
  other_qualifications: string([
    maxLength(2500, VM.other_qualifications.maxLength),
  ]),
});
export type EducationCreateSchemaType = Output<typeof Schema>;

const BioEducationCreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  // form status
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<EducationCreateSchemaType>({
    resolver: valibotResolver(Schema),
  });

  const onSubmit: SubmitHandler<EducationCreateSchemaType> = async FormData => {
    await createBioEducation<EducationCreateSchemaType>({
      data: FormData,
      setError,
      reset,
      toast,
      router,
      setIsFormLoading,
    });
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* education_mediums */}
        <SelectBox
          label={Data.inputs.education_medium.title}
          labelRequired={true}
          triggerText={Data.inputs.education_medium.triggerText}
          options={education_mediums}
          errorMessage={errors.education_medium?.message}
          setValue={value => setValue("education_medium", value)}
        />
        {/* Highest Qualification */}
        <TextareaBox
          label={Data.inputs.highest_qualification.title}
          labelRequired={true}
          errorMessage={errors.highest_qualification?.message}
          fieldName="highest_qualification"
          placeholder={Data.inputs.highest_qualification.placeholder}
          suggestions={Data.inputs.highest_qualification.suggestions}
          register={register("highest_qualification")}
        />

        {/* Current Study */}
        <TextareaBox
          label={Data.inputs.current_study.title}
          errorMessage={errors.current_study?.message}
          fieldName="current_study"
          placeholder={Data.inputs.current_study.placeholder}
          suggestions={Data.inputs.current_study.suggestions}
          register={register("current_study")}
        />

        {/* Previous Exams */}
        <TextareaBox
          label={Data.inputs.previous_exams.title}
          labelRequired={true}
          errorMessage={errors.previous_exams?.message}
          fieldName="previous_exams"
          placeholder={Data.inputs.previous_exams.placeholder}
          suggestions={Data.inputs.previous_exams.suggestions}
          register={register("previous_exams")}
        />

        {/* Other Qualifications */}
        <TextareaBox
          label={Data.inputs.other_qualifications.title}
          errorMessage={errors.other_qualifications?.message}
          fieldName="other_qualifications"
          placeholder={Data.inputs.other_qualifications.placeholder}
          suggestions={Data.inputs.other_qualifications.suggestions}
          register={register("other_qualifications")}
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

export default BioEducationCreateForm;
