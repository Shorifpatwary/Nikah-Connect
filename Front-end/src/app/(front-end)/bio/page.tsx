import Section from "@/components/blocks/section";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectnikah.com"),
  title: "বাংলাদেশী",
  description:
    "Connect Nikah is the leading Bangladeshi Muslim matrimony website",
};

const BioPage = () => {
  return <Section>public bio page</Section>;
};

export default BioPage;
