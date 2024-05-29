export const data = {
  current_page: 1,

  first_page_url: "http://localhost:8000/api/user?page=1",
  from: 1,
  last_page: 1,
  last_page_url: "http://localhost:8000/api/user?page=1",
  links: [
    {
      url: null,
      label: "&laquo; Previous",
      active: false,
    },
    {
      url: "http://localhost:8000/api/user?page=1",
      label: "1",
      active: true,
    },
    {
      url: null,
      label: "Next &raquo;",
      active: false,
    },
  ],
  next_page_url: null,
  path: "http://localhost:8000/api/user",
  per_page: 20,
  prev_page_url: null,
  to: 12,
  total: 12,
};
