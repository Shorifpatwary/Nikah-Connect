// Utility function to convert a string to a base64 encoded string
const base64Encode = (text: string): string => {
  return btoa(unescape(encodeURIComponent(text)));
};

// Utility function to convert a base64 encoded string back to a regular string
const base64Decode = (base64data: string): string => {
  return decodeURIComponent(escape(atob(base64data)));
};
