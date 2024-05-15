import Routes from "@/assets/data/route";
import { TitleSm } from "@/components/blocks/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FC, ReactNode } from "react";
type AuthFormWrapperProps = {
  formType?: "registration" | "login" | "forget-password" | "reset-password";
  children?: ReactNode;
  formTitle: string;
};

const AuthFormWrapper: FC<AuthFormWrapperProps> = ({
  formType = "registration",
  children,
  formTitle,
}) => {
  return (
    <main className="flex items-center justify-center">
      <Card className="mx-auto  max-w-md space-y-4 p-2 py-10 ">
        <CardHeader>
          <TitleSm className="text-center text-3xl font-bold capitalize">
            {formTitle}
          </TitleSm>
        </CardHeader>
        <CardContent className="max-[320px]:p-2">
          <div className="space-y-4">
            {/* continue using third party services */}
            {/* <div className=" flex flex-1 flex-col gap-4">
              <Button className="w-full" variant="outline">
                <span className="flex items-center justify-around gap-6">
                  <GoogleIcon />
                  <p className="capitalize">continue using Google</p>
                </span>{" "}
              </Button>
              <Button className="w-full" variant="outline">
                <span className="flex items-center justify-around gap-6">
                  <FacebookIcon />
                  <p className="capitalize">continue using Facebook</p>
                </span>{" "}
              </Button>
            </div> */}
            {/* separator */}
            {/* <div className="center flex w-full flex-1 items-center justify-center gap-2 text-center  text-black dark:text-primary">
              <Separator className=" w-4/12" />
              <ParagraphMd className="w-3/12 capitalize">অথবা</ParagraphMd>
              <Separator className=" w-4/12" />
            </div> */}

            {/* registration form */}
            {children}
          </div>
        </CardContent>
        {formType === "registration" && (
          <div className="flex flex-col gap-4 text-center text-sm">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link className="linked underline" href={Routes.Login}>
                Login
              </Link>
            </div>
            <p>
              By registering you agree to our{" \n"}
              <Link className="underline" href={Routes.TermsAndCondition}>
                Terms of Service
              </Link>{" "}
              and {" \n "}
              <Link className="underline" href={Routes.PrivacyPolicy}>
                Privacy Policy
              </Link>
              .{"\n "}
            </p>
          </div>
        )}
        {formType === "login" && (
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="underline" href={Routes.Registration}>
              Sign up
            </Link>
          </div>
        )}
        {formType === "forget-password" && (
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link className="underline" href={Routes.Login}>
              Sign up
            </Link>
          </div>
        )}
        {formType === "reset-password" && (
          <div className="text-center text-sm">
            Don't want to reset your password?{" "}
            <Link className="underline" href={Routes.Login}>
              Sign up
            </Link>
          </div>
        )}
      </Card>
    </main>
  );
};

export default AuthFormWrapper;
