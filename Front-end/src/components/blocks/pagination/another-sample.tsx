import { PaginationProps } from "@/assets/data/response-types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getQueryParams } from "@/lib/query/getQueryParams";
import { queryString } from "@/lib/query/queryString";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
interface Props extends PaginationProps {
  className?: string;
}

const AnotherPagination = ({
  className,
  current_page,
  last_page,
  links,
}: Props) => {
  const createQueryString = queryString();
  const router = useRouter();
  const handleUpdateQuery = (page: number) => {
    const currentQueryParams = getQueryParams();
    const newQuery = createQueryString({
      ...currentQueryParams,
      page,
    });
    router.push(`?${newQuery}`);
  };
  return (
    <Pagination className={cn("mx-0 w-5/12", className)}>
      <PaginationContent>
        {current_page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className={`disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:opacity-25 ${current_page <= 1 ? " pointer-events-none cursor-not-allowed opacity-75" : "cursor-pointer"}`}
              onClick={() => {
                if (current_page > 1) {
                  handleUpdateQuery(current_page - 1);
                }
              }}
              aria-disabled={current_page <= 1}
              tabIndex={current_page <= 1 ? -1 : undefined}
              // disabled={current_page === 1}
            />
          </PaginationItem>
        )}

        {links
          // Filter to keep only numeric page links
          .filter(link => !isNaN(Number(link.label)))
          .map(link => (
            <PaginationItem key={link.label}>
              <PaginationLink
                className={` ${link.active ? " pointer-events-none cursor-not-allowed " : "cursor-pointer"}`}
                isActive={link.active}
                onClick={() => {
                  if (link.url && !link.active) {
                    const url = new URL(link.url);
                    const page = url.searchParams.get("page");
                    if (page) {
                      handleUpdateQuery(Number(page));
                    }
                  }
                }}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          ))}
        {current_page < last_page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {current_page < last_page && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (current_page < last_page) {
                  handleUpdateQuery(current_page + 1);
                }
              }}
              className={` ${current_page >= last_page ? " pointer-events-none cursor-not-allowed opacity-75" : "cursor-pointer"}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default AnotherPagination;
