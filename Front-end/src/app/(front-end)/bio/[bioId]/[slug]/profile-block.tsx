import BioProfile from "@/app/(front-end)/bio/(component)/bio-card/bio-profile";
import { BioInterface } from "@/assets/data/response-types/bio";
import { ParagraphMd } from "@/components/blocks/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props extends Pick<BioInterface, "bio_profile" | "id"> {
  className?: string;
}

const BioProfileBlock = ({ bio_profile, id, className }: Props) => {
  // const handleCopy = () => {
  //   console.log("first");
  // };
  return (
    <Card
      className={cn(
        "2xl:w-1/4] box-border flex w-80 shrink flex-col items-center justify-center gap-8 self-center border border-accent py-8",
        className
      )}
    >
      {/* image */}
      <div className="center-center">
        <BioProfile bio_profile={bio_profile} className="w-full" />
      </div>
      {/* account id */}
      <div className="flex flex-row items-center justify-center gap-2">
        <ParagraphMd className="text-primary">বায়োডাটা নংঃ {id}</ParagraphMd>
        {/* <Copy onClick={handleCopy} className=" hover:cursor-pointer" /> */}
      </div>
    </Card>
  );
};

export default BioProfileBlock;
