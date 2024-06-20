import { Meta } from "@/assets/data/response-types";
import processPaginationLinks from "@/components/blocks/pagination/processPaginationLinks";
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
interface Props {
  className?: string;
  meta: Meta;
}

const CustomPagination = ({ className, meta }: Props) => {
  const { current_page, last_page, links } = meta;
  // Filter to keep only numeric page links
  const numberPageLinks = links.filter(link => !isNaN(Number(link.label)));

  const processedLinks = processPaginationLinks({
    current_page,
    last_page,
    links: numberPageLinks,
  });

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

        {processedLinks.map(link => (
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
        {Number(processedLinks[processedLinks.length - 1].label) <
          last_page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (current_page < last_page) {
                handleUpdateQuery(current_page + 1);
              }
            }}
            className={` ${current_page >= last_page ? " pointer-events-none cursor-not-allowed  opacity-75" : "cursor-pointer"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
