import footerData from "@/assets/data/footer";
import Logo from "@/components/blocks/logo";
import Section from "@/components/blocks/section";
import { ParagraphMd, ParagraphSm } from "@/components/blocks/typography";
import Link from "next/link";

const Footer = () => {
  return (
    <Section rowClassName="flex-col" className="py-10" tag="footer">
      {/* <footer className="flex flex-col items-center   justify-between  px-10 py-6"> */}
      <div className="shrink-1 flex w-full flex-row flex-wrap items-start justify-between gap-8">
        <div className="flex w-6/12 flex-col items-center gap-2  max-md:basis-44 md:w-4/12">
          <Logo logo={footerData.logo} />
          <ParagraphMd>{footerData.description} </ParagraphMd>
          <div className="flex gap-4 ">
            {footerData.socialLinks.map((item, index) => (
              <Link key={item.link} href={item.link}>
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        {footerData.menus.map((item, index) => (
          <div
            className=" flex w-5/12 flex-col gap-2  md:w-2/12"
            key={item.title}
          >
            <ParagraphMd>{item.title}</ParagraphMd>
            {item.menus.map(menu => (
              <Link
                key={menu.title}
                className="text-gray-300 hover:text-white"
                href={menu.href}
              >
                <ParagraphSm>{menu.title}</ParagraphSm>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="col-span-4 mb-14 mt-6 text-center md:mb-2">
        <ParagraphSm
          dangerouslySetInnerHTML={{ __html: footerData.bottomInfo }}
        />
      </div>
      {/* </footer> */}
    </Section>
  );
};

export default Footer;
