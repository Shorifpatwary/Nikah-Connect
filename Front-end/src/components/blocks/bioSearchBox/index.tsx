"use client";
import { LocationTypeWithoutChildren } from "@/assets/data/response-types/locations";
import {
  BioSearchData,
  bioTypes,
  marriageStatusTypes,
} from "@/components/blocks/bioSearchBox/data";
import SelectLocations from "@/components/blocks/bioSearchBox/selectLocations";
import SelectBox from "@/components/blocks/inputBox/selectBox";

import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  className?: string;
};

const BioSearchBox = ({ className }: Props) => {
  const [bioType, setBioType] = useState<bioTypes>("all");
  const [marriageStatusTypes, setMarriageStatusTypes] =
    useState<marriageStatusTypes>("all");
  const [locations, setLocations] = useState<LocationTypeWithoutChildren[]>([]);
  return (
    <main
      className={cn("flex w-full items-center justify-center p-2", className)}
    >
      <form action="" className="flex w-11/12 flex-col gap-8">
        {/* বায়োডাটার ধরন */}
        <SelectBox
          label={BioSearchData.bioTypes.label}
          triggerText={BioSearchData.bioTypes.hintText}
          options={BioSearchData.bioTypes.options}
          setValue={setBioType as Dispatch<SetStateAction<string>>}
        />
        {/* বৈবাহিক অবস্থার ধরন */}
        <SelectBox
          label={BioSearchData.marriageStatusTypes.label}
          hintText={BioSearchData.marriageStatusTypes.hintText}
          triggerText={BioSearchData.marriageStatusTypes.triggerText}
          options={BioSearchData.marriageStatusTypes.options}
          setValue={setMarriageStatusTypes as Dispatch<SetStateAction<string>>}
        />
        {/* ঠিকানা শনাক্ত করন। */}
        <SelectLocations
          values={locations}
          setValues={setLocations}
          label={BioSearchData.locations.label}
        />
      </form>
    </main>
  );
};

export default React.memo(BioSearchBox);
