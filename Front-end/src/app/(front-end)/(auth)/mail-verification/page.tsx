import { userCookieName } from "@/assets/data/config/app.config";
import Routes from "@/assets/data/route";
import Section from "@/components/blocks/section";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VerificationBlock from "./verification-block";
const MailVerification = () => {
  // Redirect when user email is verified.
  const cookieStore = cookies();
  const userCookie = cookieStore.get(userCookieName);
  if (userCookie) {
    const authUser = JSON.parse(userCookie?.value);
    if (authUser) {
      if (authUser.email_verified_at) {
        redirect(Routes.Profile);
      }
    }
  } else {
    console.error(userCookie, "userCookie are undefined ");
  }

  return (
    <Section rowClassName="max-md:flex-col gap-4 max-md:gap-20 place-content-center">
      <VerificationBlock />
    </Section>
  );
};

export default MailVerification;
