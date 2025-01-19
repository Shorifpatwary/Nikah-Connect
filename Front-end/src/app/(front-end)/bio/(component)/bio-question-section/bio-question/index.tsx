import { cn } from "@/lib/utils";
type Props = {
  question: string | number | undefined;
  answer: string | number | undefined;
  className?: string;
};

const BioItemQuestion = ({ answer = "", className, question = "" }: Props) => {
  if (!answer) {
    return null; // Return null to render nothing
  }
  return (
    <div
      className={cn(
        "flex text-start text-2xl first:border-t-border md:text-2xl lg:text-xl",
        className
      )}
    >
      <div className="flex flex-1 justify-center border border-border p-1 font-bold">
        {question}
      </div>
      <div className="border-r-1 flex flex-1 justify-center border  border-border p-1">
        {answer}
      </div>
    </div>
  );
};

export default BioItemQuestion;
