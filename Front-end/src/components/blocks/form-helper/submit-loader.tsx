import { Loader2 } from "lucide-react";

type Props = {
  text?: string;
  className?: string;
};
const SubmitLoader = ({ text = "অপেক্ষা করুন" }: Props) => {
  return (
    <span className="flex items-center  gap-2 ">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {text}
    </span>
  );
};

export default SubmitLoader;
