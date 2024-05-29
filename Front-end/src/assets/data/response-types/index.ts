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
export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationProps {
  current_page: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}
