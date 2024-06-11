import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectnikah.com"),
  title: "বাংলাদেশী",
  description:
    "Connect Nikah is the leading Bangladeshi Muslim matrimony website",
};

const AboutPage = () => {
  return <div>About Page </div>;
};

export default AboutPage;
