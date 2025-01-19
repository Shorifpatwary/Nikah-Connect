import BioProfile from "@/app/(front-end)/bio/(component)/bio-card/bio-profile";
import { BioProfileType } from "@/assets/data/response-types/status-types";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  profileClassName?: string;
  bio_profile_types: BioProfileType[];
}
const BioExpectedProfile = ({ className, bio_profile_types }: Props) => {
  if (!(bio_profile_types.length > 0)) {
    return;
  }
  return (
    <div className={cn("flex flex-1 flex-row justify-center gap-1", className)}>
      {bio_profile_types.map(item => (
        <BioProfile
          bio_profile={item}
          key={item}
          className="w-[31%] max-w-[49%] grow"
        />
      ))}
    </div>
  );
};

export default BioExpectedProfile;
