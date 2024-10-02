import { TitleSm } from "@/components/blocks/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FormProps = {
  formType?: "registration" | "login" | "forget-password" | "reset-password";
  children?: React.ReactNode;
  FormFooter?: React.ReactNode;
  formTitle: string;
  className?: string;
};

const FormContainer = ({
  children,
  formTitle,
  FormFooter,
  className,
}: FormProps) => {
  return (
    <main
      className={cn(
        "flex w-11/12 items-center justify-center max-[400px]:w-full sm:w-10/12 md:w-9/12 lg:w-8/12",
        className
      )}
    >
      <Card className="mx-auto w-full  p-2 py-10">
        <CardHeader>
          <TitleSm className="text-center text-3xl font-bold capitalize">
            {formTitle}
          </TitleSm>
        </CardHeader>
        <CardContent className=" max-sm:p-2">
          <div className="space-y-4">{children}</div>
        </CardContent>
        {FormFooter && <CardFooter>{FormFooter}</CardFooter>}
      </Card>
    </main>
  );
};

export default FormContainer;
