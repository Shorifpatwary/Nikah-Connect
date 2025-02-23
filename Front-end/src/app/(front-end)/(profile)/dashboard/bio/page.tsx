"use client";
import { deleteAuthCookies } from "@/app/(front-end)/(auth)/authCookie";
import { BioWithFilledMarks } from "@/assets/data/response-types/bio";
import Routes from "@/assets/data/routes";
import Section from "@/components/blocks/section";
import BioEdit from "@/components/dashboard/bio/bio-edit";
import BioHeaderAction from "@/components/dashboard/bio/bio-header-action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BioPage = () => {
  const router = useRouter();

  const [bioWithFilledMarks, setBioWithFilledMarks] = useState<
    BioWithFilledMarks | null | 404
  >(null);

  useEffect(() => {
    const fetchFilledMarks = async () => {
      try {
        const response = await fetch(`/api/bio/filled-marks`);
        if (!response.ok) {
          if (response.status === 401) {
            // redirect to login unauthenticated user.
            deleteAuthCookies();
            router.push(Routes.Login);
          } else if (response.status === 404) {
            setBioWithFilledMarks(404);
          }
          throw new Error("Failed to fetch Data");
        }
        const data = await response.json();
        setBioWithFilledMarks(data.data);
      } catch (error) {
        console.error(error, "from edit marks");
      }
    };
    fetchFilledMarks();
  }, []);

  return (
    <Section>
      <BioHeaderAction bioWithFilledMarks={bioWithFilledMarks} />
      <BioEdit bioWithFilledMarks={bioWithFilledMarks} />
    </Section>
  );
};

export default BioPage;
