import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getQueryParams } from "@/lib/query/getQueryParams";
import { queryString } from "@/lib/query/queryString";
import { cn } from "@/lib/utils";
import { ArrowDownUp } from "lucide-react";
import { useRouter } from "next/navigation";
export interface columnType {
  title: string;
  label: string;
  sortable?: boolean;
  className?: string;
}

type Props = {
  className?: string;
  columns: columnType[];
};

const T_Head = ({ className, columns }: Props) => {
  const router = useRouter();
  const createQueryString = queryString();

  const handleSort = (columnName: string) => {
    const currentQueryParams = getQueryParams();

    // Determine the current sort direction for the column
    const currentSortColumn = currentQueryParams.sort;
    let newSortDirection: "asc" | "desc" = "asc";

    if (currentSortColumn === columnName) {
      // If the column is already being sorted, toggle the sort direction
      newSortDirection =
        currentQueryParams.sort_direction === "asc" ? "desc" : "asc";
    }
    const newQuery = createQueryString({
      ...currentQueryParams,
      sort: columnName,
      sort_direction: newSortDirection,
      page: 1,
    });
    router.push(`?${newQuery}`);
  };
  return (
    <TableHeader className={cn("capitalize", className)}>
      <TableRow>
        {columns.map(column => {
          if (!column.sortable) {
            return (
              <TableHead
                key={column.label}
                className={cn("", column.className)}
              >
                {column.title}{" "}
              </TableHead>
            );
          } else {
            return (
              <TableHead
                key={column.label}
                className={cn("capitalize", column.className)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 data-[state=open]:bg-accent"
                  onClick={() => handleSort(column.title)}
                >
                  <span>{column.label}</span>
                  <ArrowDownUp className="ml-2 size-4" aria-hidden="true" />
                </Button>
              </TableHead>
            );
          }
        })}
      </TableRow>
    </TableHeader>
  );
};

export default T_Head;
