import { TitleLg, TitleSm } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import Link from "next/link";

type props = {
  className?: string;
  title: string;
  link: string;
  editTitle?: string;
  mark?: number;
};

const EditBlock = ({ className, title, mark, link, editTitle }: props) => {
  const point = mark ? mark : 0;
  return (
    <div
      className={cn(
        "flex grow flex-col gap-2 rounded border-2 border-muted p-2 py-4",
        className
      )}
    >
      <div className="flex justify-between gap-4">
        <TitleSm>{title}</TitleSm>
        <Link href={link} title={editTitle}>
          <Button size="icon" className="my-auto justify-center">
            <EditIcon />
          </Button>
        </Link>
      </div>
      <TitleLg
        className={`text-center   ${point >= 80 ? "text-green-500" : point >= 50 ? "text-yellow-500" : "text-red-500"}`}
      >
        {point}%
      </TitleLg>
      <Progress value={point} className={`w-[${point}%]`} />
    </div>
  );
};

export default EditBlock;
