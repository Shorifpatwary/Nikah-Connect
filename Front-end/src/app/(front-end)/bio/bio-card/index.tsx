import BioExpectedProfile from "@/app/(front-end)/bio/bio-card/bio-expected-profile";
import BioProfile from "@/app/(front-end)/bio/bio-card/bio-profile";
import QuestionColumn from "@/app/(front-end)/bio/bio-card/question-column";
import { heights, weights } from "@/assets/data/config/app.config";
import {
  BioInterface,
  GeneralSectionInterface,
  ProfessionInterface,
} from "@/assets/data/response-types/bio";
import { ParagraphMd } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, convertStringToArray, formatMonthYearInBangla } from "@/lib/utils";
import { ExternalLink, EyeIcon } from "lucide-react";

interface Props
  extends Pick<
      GeneralSectionInterface,
      | "id"
      | "gender"
      | "height"
      | "weight"
      | "complexion"
      | "birth_date"
      | "updated_at"
    >,
    Pick<BioInterface, "bio_profile">,
    Pick<ProfessionInterface, "profession"> {
  bio_profile_types: string;
  className?: string;
}

const BioCard = ({
  className,
  id,
  gender,
  birth_date,
  height,
  weight,
  complexion,
  bio_profile,
  bio_profile_types,
  profession,
  updated_at,
}: Props) => {
  console.log(profession, "profession", gender, "gender", id, "id");
  console.log(
    height,
    "height_",
    heights.filter(item => Number(item.value) == Number(height))[0]?.label,
    "height",
    id,
    "id"
  );

  return (
    <Card
      className={cn(
        "box-border flex w-full flex-col gap-2 border border-accent py-8  sm:w-[49%] sm:flex-col sm:gap-5 lg:w-[32.5%] 2xl:w-[24%]",
        className
      )}
    >
      <CardHeader className="border-0 border-b border-primary pt-4">
        {/* card heading */}
        <div className="flex flex-1 flex-row justify-center gap-2 align-top">
          {/* avatar */}
          <div className="flex w-6/12 flex-shrink flex-col gap-2">
            <BioProfile bio_profile={bio_profile} className="w-full" />
            <BioExpectedProfile
              className="justify-center"
              bio_profile_types={convertStringToArray(bio_profile_types)}
            />
          </div>

          <div className="flex w-6/12 flex-col items-end justify-center gap-6 p-1 text-right align-middle">
            <div className="flex max-h-min flex-1 flex-row flex-wrap items-center gap-1 p-1">
              <EyeIcon size={30} className="mt-[-2px] sm:text-2xl" />
              <ParagraphMd className="text-2xl sm:text-xl">14</ParagraphMd>
            </div>
            <div className="flex-col gap-1">
              <ParagraphMd className="text-2xl sm:text-xl">
                {/* text-nowrap  */}
                বায়োডাটা নাম্বার
              </ParagraphMd>
              {/*// !! text size 1 step lower, because this will be in english */}
              <ParagraphMd className="text-xl text-primary sm:text-base">
                {/* text-nowrap */}
                {id}
              </ParagraphMd>
            </div>
            <div className="flex-col gap-1">
              {/* text-nowrap */}
              <ParagraphMd className="text-2xl  sm:text-xl ">
                সর্বশেষ আপডেট{" "}
              </ParagraphMd>
              {/* text-nowrap */}
              <ParagraphMd className="text-2xl text-primary sm:text-xl">
                {formatMonthYearInBangla(updated_at)}
              </ParagraphMd>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-8">
        <QuestionColumn
          question="জন্মসন"
          answer={formatMonthYearInBangla(birth_date)}
        />
        <QuestionColumn
          question="উচ্চতা"
          answer={`${
            heights.filter(item => Number(item.value) == Number(height))[0]
              ?.label || ""
          }`}
        />
        <QuestionColumn
          question="ওজন"
          answer={`${
            weights.filter(item => Number(item.value) == Number(weight))[0]
              ?.label || ""
          }`}
        />
        {gender === "পাত্রী" ? (
          <QuestionColumn question="গাত্রবর্ণ" answer={complexion} />
        ) : (
          <QuestionColumn question="পেশা" answer={profession} />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full gap-4 p-6">
          <ExternalLink />{" "}
          <ParagraphMd className="text-2xl">বায়োডাটা দেখুন</ParagraphMd>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BioCard;
