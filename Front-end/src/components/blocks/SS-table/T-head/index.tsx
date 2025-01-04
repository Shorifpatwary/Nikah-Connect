import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getQueryParams } from "@/lib/query/getQueryParams";
import { queryString } from "@/lib/query/queryString";
import { cn } from "@/lib/utils";
import { ArrowDownUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
export interface columnType {
  name: string;
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
    const searchParams = useSearchParams(); // Fetch search parameters
    // Memoize query params and filters
    const { params } = useMemo(
      () => getQueryParams(searchParams),
      [searchParams]
    );

    // Determine the current sort direction for the column
    const currentSortColumn = params.sort;
    let newSortDirection: "asc" | "desc" = "asc";

    if (currentSortColumn === columnName) {
      // If the column is already being sorted, toggle the sort direction
      newSortDirection = params.sort_direction === "asc" ? "desc" : "asc";
    }
    const newQuery = createQueryString({
      ...params,
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
                {column.name}{" "}
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
                  onClick={() => handleSort(column.name)}
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
