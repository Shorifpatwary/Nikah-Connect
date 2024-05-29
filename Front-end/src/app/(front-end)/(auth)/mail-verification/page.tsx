import Section from "@/components/blocks/section";
import VerificationBlock from "./verification-block";

const MailVerification = () => {
  return (
    <Section rowClassName="max-md:flex-col gap-4 max-md:gap-20 place-content-center">
      <VerificationBlock />
    </Section>
  );
};

export default MailVerification;
