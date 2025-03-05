"use client";

import FilterBox from "@/app/(front-end)/bio/(component)/bio-filter-action/filter-box";
// import GeneralFilter from "@/app/(front-end)/bio/(component)/bio-filter-action/section-filter-box/general-filter";
import SectionFilterContainer from "@/app/(front-end)/bio/(component)/bio-filter-action/section-filter-container";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import Section from "@/components/blocks/section";
import { ParagraphMd } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQueryParams } from "@/lib/query/getQueryParams";
import { queryString } from "@/lib/query/queryString";
import { cn } from "@/lib/utils";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { FilterIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { array, object, string } from "valibot";

interface Props {
  className?: string;
}

export type SectionFormInputsType = Partial<{
  id: number | null;
  gender: string[];
  marital_status: string[];
  birth_date: number[];
  height: number[];
  weight: number[];
  complexion: string[];
  blood_group: string[];
  education_medium: string[];
  economic_status: string[];
  profession: string[];
  mazhab: string[];
  bio_profile: string[];
  expected_complexion: string[];
  expected_marital_status: string[];
  expected_bio_profile_types: string[];
}>;

export const defaultValues = {
  id: null,
  gender: [],
  marital_status: [],
  height: [3, 7], // Default height range
  weight: [30, 120], // Default weight range
  birth_date: [1960, 2020], // Default year range
  complexion: [],
  blood_group: [],
  education_medium: [],
  economic_status: [],
  profession: [],
  mazhab: [],
  bio_profile: [],
  expected_complexion: [],
  expected_marital_status: [],
  expected_bio_profile_types: [],
};

import { number, optional } from "valibot";

// Schema definition
export const Schema = object({
  id: optional(string()),
  gender: optional(array(string())),
  marital_status: optional(array(string())),
  height: optional(array(number())),
  weight: optional(array(number())),
  birth_date: optional(array(number())),
  complexion: optional(array(string())),
  blood_group: optional(array(string())),
  education_medium: optional(array(string())),
  economic_status: optional(array(string())),
  profession: optional(array(string())),
  mazhab: optional(array(string())),
  bio_profile: optional(array(string())),
  expected_complexion: optional(array(string())),
  expected_marital_status: optional(array(string())),
  expected_bio_profile_types: optional(array(string())),
});

const BioFilterAction = ({ className }: Props) => {
  const router = useRouter();

  const currentQueryParams = getQueryParams();
  const locationIds = currentQueryParams.location_id;

  const createQueryString = queryString();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    watch,
    formState: { isLoading },
  } = useForm<SectionFormInputsType>({
    resolver: valibotResolver(Schema),
    defaultValues,
  });

  const [height, weight, birth_date] = watch([
    "height",
    "weight",
    "birth_date",
  ]);

  const [locations, setLocations] = useState<LocationTypeWithoutChildren[]>([]);

  const onSubmit: SubmitHandler<SectionFormInputsType> = async data => {
    // Create a dynamic query object based on form data and locations
    const queryObject: Record<string, any> = {
      // general section query
      id: data.id || null,
      gender:
        data.gender?.join(",") !== defaultValues.gender.join(",")
          ? data.gender?.join(",") || null
          : null,
      marital_status:
        data.marital_status?.join(",") !==
        defaultValues.marital_status.join(",")
          ? data.marital_status?.join(",") || null
          : null,
      height:
        data.height?.join(",") !== defaultValues.height.join(",")
          ? data.height?.join(",") || null
          : null,
      weight:
        data.weight?.join(",") !== defaultValues.weight.join(",")
          ? data.weight?.join(",") || null
          : null,
      birth_date:
        data.birth_date?.join(",") !== defaultValues.birth_date.join(",")
          ? data.birth_date?.join(",") || null
          : null,
      complexion:
        data.complexion?.join(",") !== defaultValues.complexion.join(",")
          ? data.complexion?.join(",") || null
          : null,
      blood_group:
        data.blood_group?.join(",") !== defaultValues.blood_group.join(",")
          ? data.blood_group?.join(",") || null
          : null,
      education_medium:
        data.education_medium?.join(",") !==
        defaultValues.education_medium.join(",")
          ? data.education_medium?.join(",") || null
          : null,
      economic_status:
        data.economic_status?.join(",") !==
        defaultValues.economic_status.join(",")
          ? data.economic_status?.join(",") || null
          : null,
      profession:
        data.profession?.join(",") !== defaultValues.profession.join(",")
          ? data.profession?.join(",") || null
          : null,
      mazhab:
        data.mazhab?.join(",") !== defaultValues.mazhab.join(",")
          ? data.mazhab?.join(",") || null
          : null,
      bio_profile:
        data.bio_profile?.join(",") !== defaultValues.bio_profile.join(",")
          ? data.bio_profile?.join(",") || null
          : null,
      expected_complexion:
        data.expected_complexion?.join(",") !==
        defaultValues.expected_complexion.join(",")
          ? data.expected_complexion?.join(",") || null
          : null,
      expected_marital_status:
        data.expected_marital_status?.join(",") !==
        defaultValues.expected_marital_status.join(",")
          ? data.expected_marital_status?.join(",") || null
          : null,
      expected_bio_profile_types:
        data.expected_bio_profile_types?.join(",") !==
        defaultValues.expected_bio_profile_types.join(",")
          ? data.expected_bio_profile_types?.join(",") || null
          : null,

      location_id: locations.map(loc => loc.id).join(",") || null,
      // Sorting parameters moved to the end
    };

    // Add the sort parameters at the end
    const sortedQueryObject = {
      ...queryObject,
      sort: "updated_at",
      sort_direction: "desc" as "desc",
      page: 1,
      per_page: 12,
    };

    // Create query string
    const newQuery = createQueryString(sortedQueryObject);

    // Navigate to the new query URL
    router.push(`?${newQuery}`);

    // Log the submitted data for debugging
    console.log("Form Submitted with Data:", data);
  };

  // Set initial values dynamically
  useEffect(() => {
    if (currentQueryParams) {
      console.log(currentQueryParams, "currentQueryParams from use effect");

      // Set array values (like gender, complexion)
      if (currentQueryParams.gender) {
        setValue("gender", currentQueryParams.gender.split(","));
      }
      if (currentQueryParams.marital_status) {
        setValue(
          "marital_status",
          currentQueryParams.marital_status.split(",")
        );
      }
      if (currentQueryParams.complexion) {
        setValue("complexion", currentQueryParams.complexion.split(","));
      }
      if (currentQueryParams.blood_group) {
        setValue("blood_group", currentQueryParams.blood_group.split(","));
      }
      if (currentQueryParams.education_medium) {
        setValue(
          "education_medium",
          currentQueryParams.education_medium.split(",")
        );
      }
      if (currentQueryParams.economic_status) {
        setValue(
          "economic_status",
          currentQueryParams.economic_status.split(",")
        );
      }
      if (currentQueryParams.profession) {
        setValue("profession", currentQueryParams.profession.split(","));
      }
      if (currentQueryParams.mazhab) {
        setValue("mazhab", currentQueryParams.mazhab.split(","));
      }
      if (currentQueryParams.bio_profile) {
        setValue("bio_profile", currentQueryParams.bio_profile.split(","));
      }
      if (currentQueryParams.expected_complexion) {
        setValue(
          "expected_complexion",
          currentQueryParams.expected_complexion.split(",")
        );
      }
      if (currentQueryParams.expected_marital_status) {
        setValue(
          "expected_marital_status",
          currentQueryParams.expected_marital_status.split(",")
        );
      }
      if (currentQueryParams.expected_bio_profile_types) {
        setValue(
          "expected_bio_profile_types",
          currentQueryParams.expected_bio_profile_types.split(",")
        );
      }

      // Set range values (like height, weight)
      if (currentQueryParams.height) {
        const height = currentQueryParams.height
          .split(",")
          .map(val => parseFloat(val) || null);
        setValue("height", [
          height[0] ?? defaultValues.height[0],
          height[1] ?? defaultValues.height[1],
        ]);
      }

      if (currentQueryParams.weight) {
        const weight = currentQueryParams.weight
          .split(",")
          .map(val => parseFloat(val) || null);
        setValue("weight", [
          weight[0] ?? defaultValues.weight[0],
          weight[1] ?? defaultValues.weight[1],
        ]);
      }

      if (currentQueryParams.birth_date) {
        const birthDate = currentQueryParams.birth_date
          .split(",")
          .map(val => parseInt(val) || null);
        setValue("birth_date", [
          birthDate[0] ?? defaultValues.birth_date[0],
          birthDate[1] ?? defaultValues.birth_date[1],
        ]);
      }
    }
  }, [currentQueryParams]);

  return (
    <div
      className={cn(
        "flex w-full flex-row justify-between align-middle",
        className
      )}
    >
      <Drawer aria-labelledby="form-drawer-title">
        <DrawerTrigger className="flex flex-row items-center gap-2">
          <FilterIcon />
          <ParagraphMd>ফিল্টার করুন</ParagraphMd>
        </DrawerTrigger>

        <DrawerContent className="max-h-[90vh] items-center">
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DrawerHeader className="w-11/12 justify-center">
              <DrawerTitle className="sr-only">Move Goal</DrawerTitle>
              <DrawerDescription className="sr-only">
                Set your daily activity goal.
              </DrawerDescription>
              <DrawerFooter className="flex flex-row justify-between gap-8 py-0">
                <Button
                  variant="outline"
                  onClick={() => {
                    reset(defaultValues);
                  }}
                >
                  Reset
                </Button>
                <DrawerClose>
                  <X className="text-destructive" />
                </DrawerClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <SubmitLoader /> : "Submit"}
                </Button>
              </DrawerFooter>
            </DrawerHeader>
            <Section className="py-0" rowClassName="justify-center w-full">
              <ScrollArea className="h-[75vh]  min-w-full rounded-md border p-4">
                <div className="flex flex-col justify-start gap-2 align-middle">
                  <SectionFilterContainer>
                    {/* filter  box */}
                    <FilterBox
                      setValue={setValue}
                      register={register}
                      getValues={getValues}
                      location_id={locationIds}
                      locations={locations}
                      setLocations={setLocations}
                      // pass range type inputs state
                      height={height}
                      weight={weight}
                      birth_date={birth_date}
                    />
                  </SectionFilterContainer>
                </div>
              </ScrollArea>
            </Section>
          </form>
        </DrawerContent>
      </Drawer>
      {/* sort by */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default memo(BioFilterAction);
