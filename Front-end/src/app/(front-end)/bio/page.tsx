"use client";
import BioCard from "@/app/(front-end)/bio/(component)/bio-card";
import BioFilterAction from "@/app/(front-end)/bio/(component)/bio-filter-action";
import BioPageLoader from "@/app/(front-end)/bio/(component)/loading/bio-page-loading";
import { BiosWithPagination } from "@/assets/data/response-types/bio";
import Routes from "@/assets/data/routes";
import CustomPagination from "@/components/blocks/pagination";
import Section from "@/components/blocks/section";
import { ParagraphMd, TitleMd } from "@/components/blocks/typography";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   metadataBase: new URL("https://www.connectnikah.com"),
//   title: "বাংলাদেশী",
//   description:
//     "Connect Nikah is the leading Bangladeshi Muslim matrimony website",
// };
const path = `${Routes.bio}`;
const apiBaseUrl = "/api/bio/public";

const BioPage = () => {
  const params = useSearchParams();
  const [data, setData] = useState<BiosWithPagination>();
  const fetchData = async () => {
    try {
      const queryString = params.toString();
      const response = await fetch(`${apiBaseUrl}?${queryString}`);
      // handle data
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  if (!data) {
    return (
      <Section className="py-6" rowClassName="flex-col w-full">
        <BioPageLoader />
      </Section>
    );
  }
  return (
    <div className="flex flex-col items-center justify-between">
      <Section className="py-6" rowClassName="flex flex-col justify-center">
        <TitleMd className="text-center">বায়োডাটা সমূহ</TitleMd>
        <ParagraphMd className="text-center">
          {data.meta.total} টি বায়োডাটা পাওয়া গেছে!
        </ParagraphMd>
      </Section>
      <Section className="justify-center py-6">
        {/* // todo make this lazy load. */}
        <BioFilterAction />
      </Section>
      <Section
        className="py-6"
        rowClassName="justify-center flex-1 flex-wrap sm:justify-start"
      >
        {data.data.map(item => (
          <BioCard
            key={item.id}
            id={item.id}
            bio_profile={item.bio_profile}
            gender={item.general_section?.gender}
            birth_date={item.general_section?.birth_date || ""}
            height={item.general_section?.height || ""}
            weight={item.general_section?.weight || ""}
            complexion={item.general_section?.complexion}
            profession={item.profession_section?.profession}
            updated_at={item.updated_at}
            bio_profile_types={item.expected_partner?.bio_profile_types || ""}
          />
        ))}
      </Section>
      <Section
        className="flex items-center justify-center py-6"
        rowClassName="flex items-center px-4 justify-between justify-items-center max-md:flex-col"
      >
        {/* bio pagination */}
        <CustomPagination meta={data?.meta} />

        {/* item view info */}
        <div className="w-11/12 text-center md:w-5/12 ">
          <ParagraphMd>
            {`${data.meta.from} থেকে ${data.meta.to} পর্যন্ত দেখানো হয়েছে।`}
          </ParagraphMd>
        </div>
      </Section>
    </div>
  );
};

export default BioPage;
