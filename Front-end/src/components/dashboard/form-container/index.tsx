import { TitleSm } from "@/components/blocks/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AdminFormProps = {
  formType?: "registration" | "login" | "forget-password" | "reset-password";
  children?: React.ReactNode;
  FormFooter?: React.ReactNode;
  formTitle: string;
  className?: string;
};

const AdminFormContainer: React.FC<AdminFormProps> = ({
  children,
  formTitle,
  FormFooter,
  className,
}) => {
  return (
    <main className={cn("flex w-96	items-center justify-center", className)}>
      <Card className="mx-auto w-full  p-2 py-10 ">
        <CardHeader>
          <TitleSm className="text-center text-3xl font-bold capitalize">
            {formTitle}
          </TitleSm>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">{children}</div>
        </CardContent>
        {FormFooter && <CardFooter>{FormFooter}</CardFooter>}
      </Card>
    </main>
  );
};

export default AdminFormContainer;
