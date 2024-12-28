"use client";

import GeneralFilter from "@/app/(front-end)/bio/(component)/bio-filter-action/section-filter-box/general-filter";
import SectionFilterContainer from "@/app/(front-end)/bio/(component)/bio-filter-action/section-filter-container";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import TextInputBox from "@/components/blocks/inputBox/textInputBox";
import Section from "@/components/blocks/section";
import { ParagraphMd } from "@/components/blocks/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { FilterIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  locations: LocationTypeWithoutChildren[];
}>;

export const defaultValues = {
  id: null,
  gender: [],
  marital_status: [],
  height: [3, 7], // Default height range
  weight: [30, 120], // Default weight range
  birth_date: [1970, 2020], // Default year range
  complexion: [],
  blood_group: [],
};

const BioFilterAction = ({ className }: Props) => {
  const searchParams = useSearchParams(); // Fetch search parameters
  const router = useRouter();

  const { params } = useMemo(
    () => getQueryParams(searchParams),
    [searchParams]
  );
  const locationIds = params.location_id;

  const createQueryString = queryString();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { isLoading },
  } = useForm<SectionFormInputsType>({ defaultValues });

  const [
    gender,
    complexion,
    blood_group,
    marital_status,
    height,
    weight,
    birth_date,
  ] = watch([
    "gender",
    "complexion",
    "blood_group",
    "marital_status",
    "height",
    "weight",
    "birth_date",
  ]);

  const [locations, setLocations] = useState<LocationTypeWithoutChildren[]>([]);

  const onSubmit: SubmitHandler<SectionFormInputsType> = async data => {
    // Create a dynamic query object based on form data and locations
    const queryObject: Record<string, any> = {
      // general section query
      gender: data.gender?.join(",") || null,
      marital_status: data.marital_status?.join(",") || null,
      height: data.height?.join(",") || null,
      weight: data.weight?.join(",") || null,
      birth_date: data.birth_date?.join(",") || null,
      complexion: data.complexion?.join(",") || null,
      blood_group: data.blood_group?.join(",") || null,
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
    if (params) {
      console.log(params, "params from use effect");

      // Set array values (like gender, complexion)
      if (params.gender) {
        setValue("gender", params.gender.split(","));
      }
      if (params.marital_status) {
        setValue("marital_status", params.marital_status.split(","));
      }
      if (params.complexion) {
        setValue("complexion", params.complexion.split(","));
      }
      if (params.blood_group) {
        setValue("blood_group", params.blood_group.split(","));
      }

      // Set range values (like height, weight)
      if (params.height) {
        const height = params.height
          .split(",")
          .map(val => parseFloat(val) || null);
        setValue("height", [
          height[0] ?? defaultValues.height[0],
          height[1] ?? defaultValues.height[1],
        ]);
      }

      if (params.weight) {
        const weight = params.weight
          .split(",")
          .map(val => parseFloat(val) || null);
        setValue("weight", [
          weight[0] ?? defaultValues.weight[0],
          weight[1] ?? defaultValues.weight[1],
        ]);
      }

      if (params.birth_date) {
        const birthDate = params.birth_date
          .split(",")
          .map(val => parseInt(val) || null);
        setValue("birth_date", [
          birthDate[0] ?? defaultValues.birth_date[0],
          birthDate[1] ?? defaultValues.birth_date[1],
        ]);
      }
    }
  }, [params]);

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
            action=""
          >
            <DrawerHeader className="w-11/12 justify-center">
              <DrawerTitle className=" sr-only">Move Goal</DrawerTitle>
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
                    <Accordion type="multiple" className="w-full">
                      {/* general section fields filter item */}
                      <GeneralFilter
                        setValue={setValue}
                        gender={gender}
                        complexion={complexion}
                        blood_group={blood_group}
                        marital_status={marital_status}
                        height={height}
                        weight={weight}
                        birth_date={birth_date}
                        location_id={locationIds}
                        locations={locations}
                        setLocations={setLocations}
                      />
                      {/* ID */}
                      <TextInputBox
                        label="ID:"
                        type="number"
                        placeholder="1524"
                        aria-label="ID"
                        register={register("id")}
                        fieldName="id"
                        min="999"
                        max="9999999"
                      />
                      {/* Add additional filters here */}
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      // onClick={submitClick}
                    >
                      {isLoading ? <SubmitLoader /> : "Submit"}
                    </Button>
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
