import BioProfile from "@/app/(front-end)/bio/(component)/bio-card/bio-profile";
import { BioInterface } from "@/assets/data/response-types/bio";
import { ParagraphMd } from "@/components/blocks/typography";
interface Props extends Pick<BioInterface, "bio_profile"> {
  labelText: string;
}

const GenerateBioProfileLabel = ({ labelText, bio_profile }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2 align-middle">
      <BioProfile bio_profile={bio_profile} className="w-16" />
      <ParagraphMd>{labelText}</ParagraphMd>
    </div>
  );
};
export default GenerateBioProfileLabel;
