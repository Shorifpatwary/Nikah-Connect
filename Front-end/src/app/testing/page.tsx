import {
  ParagraphLg,
  ParagraphMd,
  ParagraphSm,
  TitleLg,
  TitleMd,
  TitleSm,
} from "@/components/blocks/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectnikah.com"),
  title: "বাংলাদেশী",
  description:
    "Connect Nikah is the leading Bangladeshi Muslim matrimony website",
};

const TestingPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-center uppercase">title</h2>
      <hr />
      {/* heading */}
      <TitleLg className="fs_7xl">
        আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা
        এখন কি করব? আমরা এখন কি করব?
      </TitleLg>
      <TitleMd className="fs_6xl">
        আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা
        এখন কি করব? আমরা এখন কি করব?
      </TitleMd>
      <TitleSm className="fs_5xl">
        আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা
        এখন কি করব? আমরা এখন কি করব?
      </TitleSm>
      <h2 className="text-center uppercase">paragraph </h2>
      <ParagraphLg>
        আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা
        এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব?
      </ParagraphLg>
      <ParagraphMd>
        আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা
        এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন
        কি করব? আমরা এখন কি করব?
      </ParagraphMd>
      <ParagraphSm>
        আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা
        এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন
        কি করব? আমরা এখন কি করব? আমরা এখন কি করব? আমরা এখন কি করব?
      </ParagraphSm>
    </div>
  );
};

export default TestingPage;
