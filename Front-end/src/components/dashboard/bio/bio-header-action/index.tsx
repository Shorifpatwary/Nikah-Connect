import { BioWithFilledMarks } from "@/assets/data/response-types/bio";
import TableSkeleton from "@/components/blocks/SS-table/table-skeleton";
import { ParagraphLg } from "@/components/blocks/typography";
import BioHeaderActionButton from "@/components/dashboard/bio/bio-header-action/bio-action-button";
import { Data } from "@/components/dashboard/bio/bio-header-action/data";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  bioWithFilledMarks: BioWithFilledMarks | null | 404;
};

const BioHeaderAction = ({ bioWithFilledMarks }: Props) => {
  const { toast } = useToast();

  if (!bioWithFilledMarks || bioWithFilledMarks == 404) {
    return (
      <div className="h-30 mt-4 items-center justify-center">
        <TableSkeleton rowCount={1} />
      </div>
    );
  }
  return (
    <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2">
      {/* title  */}
      <ParagraphLg>{Data.title}</ParagraphLg>
      {/* action button */}
      <div className="flex justify-center gap-2">
        <BioHeaderActionButton
          bioWithFilledMarks={bioWithFilledMarks}
          toast={toast}
        />
        {/* Status change button */}
        {["approved", "married", "inactive"].includes(
          bioWithFilledMarks.status
        ) && (
          <Link href={Data.changeStatus.url} prefetch={false}>
            <Button className="text-xl" variant="secondary">
              {Data.changeStatus.label}
            </Button>
          </Link>
        )}
        <Button size="icon">
          <EyeIcon />
        </Button>
        {/* toast */}
        <Toaster />
      </div>
    </div>
  );
};

export default BioHeaderAction;
