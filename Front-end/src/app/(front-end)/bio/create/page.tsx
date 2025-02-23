import Routes from "@/assets/data/routes";
import Section from "@/components/blocks/section";
import { ParagraphMd, TitleSm } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from "lucide-react";
import Link from "next/link";

interface ComparisonInterface {
  title: string;
  type: "short" | "long";
  description: string;
  features: string[];
  button: {
    link: string;
    text: string;
  };
}
interface PlanFeature {
  section: string;
  features: {
    question: string;
    short: boolean;
    long: boolean;
    inputType: "select" | "text" | "textarea" | "date" | "mail";
    isRequired: boolean;
  }[];
}
export const dynamic = "force-static";

const planFeatures: PlanFeature[] = [
  {
    section: "সাধারন তথ্যাবলি",
    features: [
      {
        question: "বায়োডাটার ধরন নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "বৈবাহিক অবস্থা নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "জন্ম তারিখ নির্ধারণ",
        short: true,
        long: true,
        inputType: "date",
        isRequired: true,
      },
      {
        question: "উচ্চতা নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "ওজন নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "গাত্রবর্ণ নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "রক্তের গ্রুপ নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "ভাষাগত দক্ষতা",
        short: false,
        long: true,
        inputType: "text",
        isRequired: false,
      },
      {
        question: "ঠিকানা নির্বাচন",
        short: true,
        long: true,
        inputType: "text",
        isRequired: true,
      },
    ],
  },
  {
    section: "ঠিকানা সম্পর্কিত তথ্য",
    features: [
      {
        question: "স্থায়ী ঠিকানার বিবরণ",
        short: true,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "বর্তমান ঠিকানার বিবরণ",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "স্থানান্তর পরিকল্পনার বিবরণ",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "শৈশবের ঠিকানা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
    ],
  },
  {
    section: "শিক্ষা সম্পর্কিত তথ্য",
    features: [
      {
        question: "শিক্ষার মাধ্যম নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "বর্তমানে অধ্যয়নের বিবরন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "সর্বোচ্চ শিক্ষাগত যোগ্যতা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "পূর্ববর্তী পরীক্ষার বিবরন",
        short: true,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "অন্যান্য শিক্ষাগত যোগ্যতা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
    ],
  },
  {
    section: "ব্যক্তিগত তথ্য",
    features: [
      {
        question: "নিজের সম্পর্কে বিবরন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "পোশাক পরিচ্ছদ",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "শারীরিক/মানসিক অসুস্থতা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রিয় বইগুলোর তালিকা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "প্রিয় ব্যক্তিদের তালিকা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "মোবাইল ব্যবহার বিস্তারিত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "বিভিন্ন দল বা কর্মকান্ডের সাথে যুক্ততা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
    ],
  },
  {
    section: "পারিবারিক তথ্য",
    features: [
      {
        question: "পারিবারিক সদস্যদের তথ্য",
        short: true,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "চাচা/মামার তথ্য",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "বংশ পরিচয়",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "আর্থিক অবস্থা নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "আর্থিক অবস্থার বিস্তারিত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
    ],
  },
  {
    section: "পেশা সম্পর্কিত তথ্য",
    features: [
      {
        question: "পেশা নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "পেশার বর্ণনা",
        short: true,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "মাসিক আয়ের পরিমাণ",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
    ],
  },
  {
    section: "ধার্মিকতা সম্পর্কিত তথ্য",
    features: [
      {
        question: "নামাজের অভ্যাস সম্পর্কে",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "হারাম সম্পর্ক সম্পর্কিত তথ্য",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "কুরআন তেলাওয়াত সম্পর্কিত তথ্য",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "মাহরাম / নন-মাহরাম মেনে চলা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "সুন্নতি দাড়ি রাখা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "বিনোদনের অভ্যাস সম্পর্কিত তথ্য",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "মাযহাব নির্বাচন",
        short: true,
        long: true,
        inputType: "select",
        isRequired: true,
      },
      {
        question: "ধর্মীয় জ্ঞান সম্পর্কে বিবরন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "পারিবারিক ধর্মীয় পরিবেশ সম্পর্কে বিবরন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
    ],
  },
  {
    section: "বিবাহ সম্পর্কিত তথ্য",
    features: [
      {
        question: "পূর্ববর্তী বিবাহ সম্পর্কিত তথ্য",
        short: true,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "বিবাহের পর চাকরি সংক্রান্ত মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "বিবাহের পর পড়াশোনা সংক্রান্ত মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "বিবাহের অনুষ্ঠান সম্পর্কিত পরিকল্পনা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "পাত্র/পাত্রী দেখার নিয়ম সম্পর্কিত মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "নিজ পক্ষের দুর্বলতা সম্পর্কিত তথ্য",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "পরিবারের পছন্দ সংক্রান্ত তথ্য",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "ছাড় দেওয়ার বিষয়ে মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "মোহরানার পরিমাণ সম্পর্কে মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "মোহরানা সম্পর্কে মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "উপহার বা নগদ অর্থ প্রদান নিয়ে মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "উপহার বা নগদ অর্থ প্রদান নিয়ে মতামত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
    ],
  },
  {
    section: "প্রত্যাশিত জীবনসঙ্গী",
    features: [
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর বয়স",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর উচ্চতা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর গাত্রবর্ণ নির্বাচন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর বৈবাহিক অবস্থা নির্বাচন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর শিক্ষাগত যোগ্যতা ",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর পেশা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর আর্থিক অবস্থা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর প্রোফাইলের ধরন নির্বাচন",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "প্রত্যাশিত জীবনসঙ্গীর পারিবারিক অবস্থা",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
      {
        question: "পছন্দের জীবনসঙ্গী সম্পর্কে বিস্তারিত",
        short: false,
        long: true,
        inputType: "textarea",
        isRequired: false,
      },
    ],
  },
  {
    section: "গোপনীয় তথ্যাবলি",
    features: [
      {
        question: "আপনার নাম",
        short: true,
        long: true,
        inputType: "text",
        isRequired: true,
      },
      {
        question: "আপনার ইমেইল",
        short: true,
        long: true,
        inputType: "mail",
        isRequired: true,
      },
      {
        question: "আপনার বিস্তারিত ঠিকানা",
        short: true,
        long: true,
        inputType: "textarea",
        isRequired: true,
      },
      {
        question: "পরিবারের সদস্যদের নাম",
        short: true,
        long: true,
        inputType: "text",
        isRequired: true,
      },
      {
        question: "বর্তমান অভিভাবক সম্পর্কে",
        short: true,
        long: true,
        inputType: "text",
        isRequired: true,
      },
      {
        question: "অভিভাবকের মোবাইল নম্বর",
        short: true,
        long: true,
        inputType: "text",
        isRequired: true,
      },
      {
        question: "ফেসবুক, ইনস্টাগ্রাম, বা টুইটারের লিংক",
        short: false,
        long: true,
        inputType: "text",
        isRequired: false,
      },
      {
        question: "স্থায়ী ঠিকানার মানচিত্রের অবস্থান",
        short: false,
        long: true,
        inputType: "text",
        isRequired: false,
      },
      {
        question: "বর্তমান ঠিকানার মানচিত্রের অবস্থান",
        short: false,
        long: true,
        inputType: "text",
        isRequired: false,
      },
      {
        question: "বায়োডাটার সাথে সম্পর্কিত সমস্ত ডকুমেন্ট",
        short: false,
        long: true,
        inputType: "text",
        isRequired: false,
      },
    ],
  },
];

const comparisonData: ComparisonInterface[] = [
  {
    title: "সংক্ষিপ্ত বায়োডাটা",
    type: "short",
    description: "একটি সহজ উপায়ে আপনার বায়োডাটা তৈরি করুন।",
    features: ["সীমিত তথ্য", "সহজ ফরমেট", "দ্রুত সম্পন্ন"],
    button: {
      link: Routes.profile_bio.short_bio.create,
      text: "সংক্ষিপ্ত বায়োডাটা তৈরি করুন",
    },
  },
  {
    title: "বিস্তারিত বায়োডাটা",
    type: "long",
    description: "বিস্তারিত তথ্য সহ একটি পূর্ণাঙ্গ বায়োডাটা তৈরি করুন।",
    features: [
      "বিস্তারিত তথ্য",
      "সম্পূর্ণ কাস্টমাইজেশন",
      "ধাপে ধাপে তৈরীর সুযোগ",
    ],
    button: {
      link: Routes.profile_bio.general.create,
      text: "বিস্তারিত বায়োডাটা তৈরি করুন",
    },
  },
];

const BioPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Section rowClassName="justify-center w-full flex-col" className="pb-10">
        {/* Pricing */}
        {/* Title */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-4 text-center lg:mb-14">
          <TitleSm className="border-b font-extrabold">
            আপনার জন্য উপযুক্ত বায়োডাটা ধরন নির্বাচন করুন
          </TitleSm>
          <ParagraphMd className="text-muted-foreground">
            দ্রুত এবং সহজ পদ্ধতিতে সংক্ষিপ্ত বায়োডাটা বা আরও বিস্তারিত তথ্য সহ
            পূর্ণাঙ্গ বায়োডাটা তৈরি করুন — আপনার প্রয়োজন অনুযায়ী আমাদের
            পরিকল্পনা থেকে বেছে নিন।
          </ParagraphMd>
        </div>
        {/* End Title */}

        {/* items */}
        <div className="flex flex-wrap justify-center gap-10">
          {comparisonData.map((item, index) => (
            <Card
              key={index}
              className={`w-full max-w-96 py-10 sm:flex-1 ${
                item.type === "long"
                  ? "border-primary max-sm:order-first"
                  : "max-sm:order-last"
              }`}
            >
              <CardHeader className="pb-2 text-center">
                <CardTitle className="!mb-7">{item.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mx-auto w-11/12 text-center text-lg">
                {item.description}
              </CardDescription>
              <CardContent>
                <ul className="mt-7 space-y-2.5 text-lg">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex space-x-2">
                      <CheckIcon
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          item.type === "long" ? "text-primary" : ""
                        }`}
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  href={item.button.link}
                  prefetch={false}
                  className="mx-auto w-full"
                >
                  <Button
                    className={`w-full text-lg`}
                    variant={item.type === "long" ? "default" : "outline"}
                  >
                    {item.button.text}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* End Grid */}
        {/* End Pricing */}
      </Section>

      {/* Comparison table */}
      <Section rowClassName="w-full justify-center" className="py-14">
        <div className="mb-10 lg:text-center">
          <TitleSm className="font-semibold">তুলনা করুন</TitleSm>
        </div>
        {/* table */}
        <Table>
          <TableHeader>
            <TableRow className="flex-1 bg-muted text-xl hover:bg-muted ">
              <TableHead className="text-xl text-primary">প্রশ্ন</TableHead>
              <TableHead className="text-center font-medium text-primary">
                সংক্ষিপ্ত
              </TableHead>
              <TableHead className="text-center font-medium text-primary">
                বিস্তারিত
              </TableHead>
              <TableHead className=" text-center font-medium text-primary">
                প্রয়োজনীয়তা
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planFeatures.map(featureType => (
              <>
                <TableRow className="bg-muted/50" key={featureType.section}>
                  <TableCell colSpan={5} className="text-lg font-bold">
                    {featureType.section}
                  </TableCell>
                </TableRow>
                {featureType.features.map(feature => (
                  <TableRow
                    key={feature.question}
                    className="text-lg text-muted-foreground"
                  >
                    <TableCell>{feature.question}</TableCell>
                    <TableCell>
                      <div className="mx-auto w-min">
                        {feature.short ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <MinusIcon className="h-5 w-5" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="mx-auto w-min">
                        {feature.long ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <MinusIcon className="h-5 w-5" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="mx-auto w-min text-lg">
                        {feature.isRequired ? (
                          // <CheckIcon className="h-5 w-5" />
                          <span>আবশ্যক</span>
                        ) : (
                          // <MinusIcon className="h-5 w-5" />
                          <span>ঐচ্ছিক</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>

        {/* End Comparison table */}
      </Section>
    </div>
  );
};

export default BioPage;
