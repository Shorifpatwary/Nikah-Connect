import { cn } from "@/lib/utils";
type Props = {
  question: string | undefined;
  answer: string | undefined;
  className?: string;
};

const BioTextItemQuestion = ({
  answer = "",
  className,
  question = "",
}: Props) => {
  if (!answer) {
    return null; // Return null to render nothing
  }

  return (
    <div
      className={cn(
        "flex flex-wrap text-start text-xl first:border-t-border md:text-xl lg:text-base",
        className
      )}
    >
      <div
        className={`flex justify-start border border-border p-2 font-bold ${
          question.length > 100 || answer.length > 150
            ? "w-full"
            : question.length > 40 || answer.length > 50
              ? "w-full md:w-[35%]"
              : "w-[45%]  md:w-[35%]"
        }`}
      >
        {question}
      </div>
      <div
        className={`border-r-1 flex justify-start border border-border p-2  ${
          question.length > 100 || answer.length > 150
            ? "w-full"
            : question.length > 40 || answer.length > 50
              ? "w-full md:w-[65%]"
              : "w-[55%] md:w-[65%]"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default BioTextItemQuestion;
