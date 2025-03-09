"use client";
import BioQuestionsSection from "@/app/(front-end)/bio/(component)/bio-question-section";
import BioTextItemQuestion from "@/app/(front-end)/bio/(component)/bio-question-section/bio-question/bio-text-item-question";
import { BioItemData } from "@/app/(front-end)/bio/[bioId]/[slug]/data";
import { HiddenInfoInterface } from "@/assets/data/response-types/bio";
import Section from "@/components/blocks/section";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";
import { useEffect, useState } from "react";

const HiddenDetail = () => {
  const apiBaseUrl = "/api/bio/view";
  const [data, setData] = useState<HiddenInfoInterface>();

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}`);
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          // remove auth cookie
          console.log(response.status, "response are 401");
        } else {
          console.error(
            `Http error when fetching coin data ${response.status}`
          );
        }
      } else {
        // handle data
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <Section rowClassName="flex-col gap-4 w-full">
        <TableSkeleton rowCount={6} rowClassName="h-10 column-2" />
      </Section>
    );
  }
  return (
    <BioQuestionsSection title={BioItemData.hidden.label}>
      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.name}
        answer={data.name}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.email}
        answer={data.email}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.location}
        answer={data.location}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.family_members_name}
        answer={data.family_members_name}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.current_parent}
        answer={data.current_parent}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.parent_mobile}
        answer={data.parent_mobile}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.social_links}
        answer={data.social_links}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.permanent_address_map_location}
        answer={data.permanent_address_map_location}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.present_address_map_location}
        answer={data.present_address_map_location}
      />

      <BioTextItemQuestion
        className="w-full"
        question={BioItemData.hidden.questions.documents_link}
        answer={String(data.documents_link)}
      />
    </BioQuestionsSection>
  );
};

export default HiddenDetail;
