type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

interface PaginationProps {
  current_page: number;
  last_page: number;
  links: Link[];
}

const processPaginationLinks = ({
  current_page,
  last_page,
  links,
}: PaginationProps): Link[] => {
  const maxLinks = 4;

  if (links.length <= maxLinks) {
    return links;
  }

  // Determine the start and end indices for slicing
  let start = 0;
  let end = maxLinks;

  if (current_page > last_page - maxLinks) {
    // Show the last maxLinks pages if the current page is within the last maxLinks pages
    start = last_page - maxLinks + 1;
    end = last_page + 1;
  } else {
    // Show the pages from the current page onwards
    start = current_page;
    end = current_page + maxLinks;
  }

  // Ensure the indices are within the bounds of the array
  start = Math.max(0, start);
  end = Math.min(links.length, end);

  return links.slice(start, end);
};
export default processPaginationLinks;
