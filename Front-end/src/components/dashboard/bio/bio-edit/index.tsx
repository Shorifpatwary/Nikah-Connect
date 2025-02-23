"use client";
import { BioWithFilledMarks } from "@/assets/data/response-types/bio";
import DefaultLoading from "@/components/blocks/loading/default";
import Section from "@/components/blocks/section";
import CreateActionLinks from "@/components/dashboard/bio/bio-edit/createActionLinks";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  className?: string;
  bioWithFilledMarks: BioWithFilledMarks | null | 404;
};

const BioEdit = ({ bioWithFilledMarks }: Props) => {
  const { toast } = useToast();

  if (!bioWithFilledMarks) {
    return (
      <Section rowClassName="justify-center items-center h-30">
        <DefaultLoading />
      </Section>
    );
  }
  return (
    // items-center h-48
    <Section rowClassName="justify-center">
      <CreateActionLinks
        bioWithFilledMarks={bioWithFilledMarks}
        toast={toast}
      />
      <Toaster />
    </Section>
  );
};

export default BioEdit;
