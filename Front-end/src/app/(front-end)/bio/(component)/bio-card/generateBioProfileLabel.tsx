import BioProfile from "@/app/(front-end)/bio/(component)/bio-card/bio-profile";
import { BioInterface } from "@/assets/data/response-types/bio";
import { ParagraphSm } from "@/components/blocks/typography";
interface Props extends Pick<BioInterface, "bio_profile"> {
  labelText: string;
}

const GenerateBioProfileLabel = ({ labelText, bio_profile }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2 align-middle">
      <BioProfile bio_profile={bio_profile} className="w-10" />
      <ParagraphSm className="font-shine text-base">{labelText}</ParagraphSm>
    </div>
  );
};
export default GenerateBioProfileLabel;
