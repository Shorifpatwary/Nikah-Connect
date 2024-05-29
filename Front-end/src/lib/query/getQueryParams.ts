export const getQueryParams = () => {
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    console.log(urlSearchParams, "urlSearchParams");
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }
  return {};
};
