"use client";
import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import DefaultLoading from "@/components/blocks/loading/default";
import Section from "@/components/blocks/section";
import CreateActionLinks from "@/components/dashboard/bio-edit/createActionLinks";
import { useEffect, useState } from "react";

const BioEdit = () => {
  const [editMarks, setEditMarks] = useState<FilledMarksInterface | null | 404>(
    null
  );
  useEffect(() => {
    const fetchFilledMarks = async () => {
      try {
        const response = await fetch(`/api/bio/filled-marks`);
        if (!response.ok) {
          if (response.status === 404) {
            setEditMarks(404);
          }
          throw new Error("Failed to fetch Data");
        }
        const data = await response.json();
        setEditMarks(data.data);
      } catch (error) {
        console.error(error, "from edit marks");
      }
    };
    fetchFilledMarks();
  }, []);

  if (!editMarks) {
    return (
      <Section rowClassName="justify-center items-center h-30">
        <DefaultLoading />
      </Section>
    );
  }
  return (
    // items-center h-48
    <Section rowClassName="justify-center">
      <CreateActionLinks marks={editMarks} />
    </Section>
  );
};

export default BioEdit;
