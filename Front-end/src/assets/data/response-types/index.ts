export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}
interface pageLink {
  url: string | null;
  label: string;
  active: boolean;
}
export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: pageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface DataWithPagination<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

export interface PaginationProps {
  meta: Meta;
}
