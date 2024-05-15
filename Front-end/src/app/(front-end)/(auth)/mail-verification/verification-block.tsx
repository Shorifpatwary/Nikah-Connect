"use client";
import Logo from "@/assets/images/website-logo.png";
import {
  ParagraphMd,
  ParagraphSm,
  TitleSm,
} from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import resendVerification from "./resend-verification";

type Props = {};

const VerificationBlock = (props: Props) => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const { toast } = useToast();

  const handleResendVerification = async () => {
    try {
      setResendDisabled(true); // Disable the button

      const response = await resendVerification();
      toast({
        title: "সফলভাবে ই-মেইল পাঠানো হয়েছে।",
        variant: "primary",
        description: "আপনার ই-মেইল যাচাই করুন।",
      });
      setTimeout(() => {
        setResendDisabled(false); // Enable the button after 30 seconds
      }, 30000);
    } catch (error) {
      setResendDisabled(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-md bg-gray-50 p-8 shadow-md dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-center">
        <Image
          alt="Logo"
          height="50"
          src={Logo}
          // src=""
          style={{
            objectFit: "cover",
          }}
          width="350"
          placeholder="blur"
        />
      </div>
      <TitleSm className="mb-4 text-center text-3xl font-bold ">
        Verify your email address
      </TitleSm>
      <ParagraphMd className="mb-6 text-center ">
        Thanks for signing up! We're excited to have you onboard. We just need
        you to verify your email address to complete your setup. Click the
        button below to verify.
      </ParagraphMd>
      <div className="mb-6 flex flex-col items-center">
        {resendDisabled && (
          <ParagraphSm className="mb-3 capitalize text-red-500 ">
            ই-মেইল না পেয়ে থাকলে ৩০ সেকেন্ড পর আবার চেষ্টা করুন।
          </ParagraphSm>
        )}
        <Button
          className="mb-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          variant="default"
          onClick={handleResendVerification}
          disabled={resendDisabled}
        >
          Resend Email
        </Button>
        <Link
          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          href="#"
        >
          Need help?
        </Link>
      </div>
      <footer className="text-center text-gray-600 dark:text-gray-300">
        If you have any issues, please contact our support team at
        support@example.com or call us at (123) 456-7890.
      </footer>
      <Toaster />
    </div>
  );
};

export default VerificationBlock;
