export const getQueryParams = () => {
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }
  return {};
};
