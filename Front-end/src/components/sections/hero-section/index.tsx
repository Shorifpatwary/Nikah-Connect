import BioSearchBox from "@/components/blocks/bioSearchBox";
import Section from "@/components/blocks/section";
import { ParagraphMd, TitleMd } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <Section rowClassName="max-md:flex-col gap-4 max-md:gap-20">
      {/* call to action block */}
      <div className=" flex w-7/12 flex-1 flex-col items-start justify-start gap-10 text-left max-md:order-2 max-md:w-full">
        <TitleMd className="*:text-secondary">
          বাংলাদেশী মুসলিম ম্যাট্রিমোনি ওয়েবসাইট <span>Delivered</span> .
        </TitleMd>
        <div>
          <ParagraphMd className="font-primary text-xl">
            দিনাজপুর-৪ (চিরিরবন্দর-খানসামা) আসনে সংসদ সদস্য আবুল হাসান মাহমুদ
            আলী নতুন মন্ত্রিসভায় অর্থমন্ত্রীর দায়িত্ব পাওয়ায় চিরিরবন্দর উপজেলা এ
            সংবর্ধনা অনুষ্ঠানের আয়োজন করে। অর্থমন্ত্রী বলেন, অর্থনীতি যেখানে
            থাকার দরকার সেখানে আছে। বর্তমান সরকার অনেক পদক্ষেপ নিয়েছে। ভারতের
            সঙ্গে লেনদেনে মাল্টিকারেন্সি চালু করেছি। ভারতের সঙ্গে রুপি, ডলার ও
            টাকার পাশাপাশি সব ধরনের লেনদেন করতে পারছি। আমরা অন্যান্য দেশের সঙ্গে
            মাল্টিকারেন্সি চালুর পদক্ষেপ গ্রহণ করতে যাচ্ছি। কিন্তু আমাদের
            প্রতিপক্ষ স্বাধীনতা বিরোধীরা সব সময় দেশের বিরুদ্ধে গুজব ছড়াচ্ছে।
            তারা তো কিছুই করতে পারে না।
          </ParagraphMd>
        </div>
        {/* call to actions */}
        <div className="flex justify-start gap-8">
          <Button variant="default">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
      </div>
      {/* search bio data  */}
      <div className=" w-5/12 max-w-3xl max-md:order-1 max-md:w-full">
        <BioSearchBox />
      </div>
    </Section>
  );
};

export default HeroSection;
