import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  question: string | number | undefined;
  answer: string | number | undefined;
}
const QuestionColumn = ({ className, question = "", answer = "" }: Props) => {
  return (
    <div
      className={cn(
        "flex text-2xl first:border first:border-x-0 first:border-t-primary sm:text-xl md:text-2xl lg:text-xl",
        className
      )}
    >
      <div className="flex flex-1 justify-center border border-l-0 border-t-0 border-primary p-1">
        {question}
      </div>
      <div className="flex flex-1 justify-center border border-x-0 border-t-0 border-primary p-1">
        {answer}
      </div>
    </div>
  );
};

export default QuestionColumn;
