import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQueryParams } from "@/lib/query/getQueryParams";
import { queryString } from "@/lib/query/queryString";
import { useRouter } from "next/navigation";

interface RecordTypes {
  label: string;
  value: string | number;
}

const RecordsPerPage = () => {
  const router = useRouter();

  const createQueryString = queryString();
  const currentQueryParams = getQueryParams();

  const handleRowsChange = (value: number) => {
    const newQuery = createQueryString({
      ...currentQueryParams,
      page: 1,
      per_page: value,
    });
    router.push(`?${newQuery}`);
  };

  const perPageRecords: RecordTypes[] = [
    { label: "05", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "40", value: 40 },
    { label: "60", value: 60 },
  ];

  return (
    <Select onValueChange={value => handleRowsChange(Number(value))}>
      <SelectTrigger className=" w-2/12">
        <SelectValue placeholder="Show Per Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="capitalize">rows per page</SelectLabel>
          {perPageRecords.map(item => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RecordsPerPage;
