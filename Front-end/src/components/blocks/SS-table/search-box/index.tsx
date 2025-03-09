import { Input } from "@/components/ui/input";
import { queryString } from "@/lib/query/queryString";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const TableSearchBox = ({ className }: Props) => {
  const router = useRouter();
  const createQueryString = queryString();
  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      const newQuery = createQueryString({
        search: trimmedValue,
        page: 1,
      });
      router.push(`?${newQuery}`);
    } else {
      const newQuery = createQueryString({
        search: null,
        page: 1,
      });
      router.push(`?${newQuery}`);
    }
  };

  return (
    <div className={cn("relative w-4/12 flex-1 md:grow-0", className)}>
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        placeholder="Search..."
        type="search"
        onBlur={e => handleSearch(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSearch(e.target.value)}
      />
    </div>
  );
};

export default TableSearchBox;
