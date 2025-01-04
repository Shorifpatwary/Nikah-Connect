import { ParagraphLg, TitleMd } from "@/components/blocks/typography";

const BioNotFound = () => {
  return (
    <div className="flex h-5/6 w-full flex-col items-center justify-center overflow-hidden p-4 text-center">
      <TitleMd className="text-xl font-semibold text-gray-700">
        কোনো বায়োডাটা পাওয়া যায়নি
      </TitleMd>
      <ParagraphLg className="mt-2 text-gray-500">
        আপনার প্রদানকৃত তথ্য অনুযায়ী কোনো বায়োডাটা খুঁজে পাওয়া যায়নি। দয়া
        করে আপনার ফিল্টারগুলো পরিবর্তন করে আবার চেষ্টা করুন।
      </ParagraphLg>
    </div>
  );
};

export default BioNotFound;
