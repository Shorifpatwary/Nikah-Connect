"use client";
import { MailVerificationData } from "@/app/(front-end)/(auth)/mail-verification/mail-verification-data";
import { sendUserInfo } from "@/app/(front-end)/(auth)/mail-verification/sendUserInfo";
import Routes from "@/assets/data/routes";
import Logo from "@/assets/images/website-logo.png";
import { ParagraphMd, TitleSm } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import resendVerification from "./resend-verification";

const VerificationBlock = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResendDisabled(false);
    }, 30000);

    setResendDisabled(true);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Gather user info and send it to the server
    const gatherAndSendUserInfo = async () => {
      const request = new Request(window.location.href);
      await sendUserInfo(request);
    };

    gatherAndSendUserInfo();
  }, []);

  const handleResendVerification = async () => {
    await resendVerification({ setResendDisabled, toast });
  };

  return (
    <div className="mx-auto max-w-xl rounded-md bg-gray-50 p-8 shadow-md dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-center">
        <Image
          alt="Logo"
          height="50"
          src={Logo}
          style={{
            objectFit: "cover",
          }}
          width="350"
          placeholder="blur"
        />
      </div>
      <TitleSm className="mb-4 text-center text-3xl font-bold ">
        {MailVerificationData.title}
      </TitleSm>
      <ParagraphMd className="mb-6 text-center ">
        {MailVerificationData.description}
      </ParagraphMd>
      <ParagraphMd className="mb-6 text-center ">
        {MailVerificationData.resendDescription}
      </ParagraphMd>
      <div className="mb-6 flex flex-col items-center">
        <Button
          className="mb-4 rounded-md bg-blue-500 px-4 py-2 text-xl text-white"
          variant="default"
          onClick={handleResendVerification}
          disabled={resendDisabled || false}
        >
          {MailVerificationData.resendButtonText}
        </Button>
        <Link
          className="text-lg text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          href={Routes.contactUs}
          prefetch={false}
        >
          {MailVerificationData.helpLink}
        </Link>
      </div>
      <footer className="text-center text-lg text-gray-600 dark:text-gray-300">
        {MailVerificationData.helpText}
      </footer>
      <Toaster />
    </div>
  );
};
export default VerificationBlock;
