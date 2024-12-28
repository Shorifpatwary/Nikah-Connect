export const getQueryString = (): string => {
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.toString();
  }
  return "";
};
