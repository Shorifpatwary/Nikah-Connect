"use client";
import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { changeBioStatus } from "@/app/(front-end)/(profile)/dashboard/bio/change-status/action";
import {
  Data,
  VM,
} from "@/app/(front-end)/(profile)/dashboard/bio/change-status/data";
import { bio_user_status } from "@/assets/data/config/app.config";
import { ShortBioInterface } from "@/assets/data/response-types/bio";
import Routes from "@/assets/data/routes";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import SelectBox from "@/components/blocks/inputBox/selectBox";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, Output, picklist } from "valibot";

// Valibot
const Schema = object({
  status: picklist(
    bio_user_status.map(option => option.value),
    VM.status.required
  ),
});
export type ChangeBioStatusSchemaType = Output<typeof Schema>;
const ChangeBioStatusForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [bioShort, setBioShort] = useState<ShortBioInterface | null>(null);

  useEffect(() => {
    const fetchShortBio = async () => {
      try {
        const response = await fetch(`/api/bio/user-record`);
        if (!response.ok) {
          if (response.status === 401) {
            // redirect to login unauthenticated user.
            deleteAuthCookies();
            router.push(Routes.Login);
          } else if (response.status === 404) {
            toast({
              title: "আপনার বায়োডাটা পাওয়া যায়নি।",
              variant: "primary",
              description:
                "আপনার বায়োডাটা খুজে পাওয়া যায়নি। অনুগ্রহ করে বায়োডাটা তৈরী করুন।",
            });
          }
          setBioShort(null);

          throw new Error("Failed to fetch Data");
        }
        const data = await response.json();
        setBioShort(data.data);
      } catch (error) {
        console.error(error, "from short bio");
      }
    };
    fetchShortBio();
  }, []);

  // form status
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<ChangeBioStatusSchemaType>({
    resolver: valibotResolver(Schema),
  });
  const onSubmit: SubmitHandler<ChangeBioStatusSchemaType> = async FormData => {
    await changeBioStatus<ChangeBioStatusSchemaType>({
      data: FormData,
      bio: bioShort,
      setError,
      toast,
      router,
      setIsFormLoading,
    });
  };

  useEffect(() => {
    if (
      bioShort &&
      ["approved", "married", "inactive"].includes(bioShort.status)
    ) {
      setValue("status", bioShort.status);
    }
  }, [bioShort]);

  if (!bioShort) {
    return <TableSkeleton rowCount={10} rowClassName="h-10 mt-2" />;
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {/* Economic Status */}
        <SelectBox
          label={Data.inputs.status.title}
          labelRequired={true}
          triggerText={Data.inputs.status.triggerText}
          options={bio_user_status}
          errorMessage={errors.status?.message}
          setValue={value => setValue("status", value)}
          defaultValue={bioShort.status}
        />

        {/* submit */}
        <Button
          className={`mt-3 w-full text-xl sm:text-lg`}
          type="submit"
          disabled={isFormLoading}
        >
          {isFormLoading ? <SubmitLoader text={Data.wait} /> : Data.submit}
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default ChangeBioStatusForm;
