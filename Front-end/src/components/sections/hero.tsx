import Section from "@/components/blocks/section";
import { ParagraphMd, TitleMd } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <Section
      className="pt-36"
      rowClassName="max-md:flex-col gap-4 max-md:gap-20"
    >
      <div className=" flex h-80 w-7/12 flex-1 flex-col items-start justify-start gap-10 text-left max-md:order-2 max-md:w-full">
        <TitleMd className="*:text-secondary">
          বাংলাদেশী মুসলিম ম্যাট্রিমোনি ওয়েবসাইট <span>Delivered</span> .
        </TitleMd>
        <div>
          <ParagraphMd className="font-primary text-xl font-medium">
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
          <p className=" font-weight-light text-xl"></p>
        </div>
        {/* call to actions */}
        <div className="flex justify-start gap-8">
          <Button variant="default">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
      </div>

      {/* <div className=" grid max-w-6xl gap-4">
        <h1 className="text-3xl font-bold lg:text-6xl">
         
        </h1>
        <p className=" max-w-2xl text-gray-500 dark:text-gray-400 md:text-xl">
          The all-in-one platform for modern web projects. Ship faster with
          component-based frontend, full-stack Jamstack, and zero configuration.
        </p>
      </div> */}

      <div className=" w-5/12 max-w-3xl max-md:order-1 max-md:w-full">
        <img
          alt="Hero image"
          className="overflow-hidden rounded-xl object-cover"
          height="400"
          src="https://placehold.co/600x400"
          style={{
            aspectRatio: "720/400",
            objectFit: "cover",
          }}
          width="720"
        />
      </div>
    </Section>
  );
};

export default HeroSection;
