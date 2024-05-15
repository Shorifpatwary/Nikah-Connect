import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Add a response interceptor to modify the response object
axios.interceptors.response.use(
  response => {
    // Exclude config, headers, and request properties from the response
    const { config, headers, request, ...responseData } = response;
    // Return a new response object with only the data and status properties
    return responseData;
  },
  error => {
    if (error.response) {
      // Exclude config, headers, and request properties from the error response
      const { config, headers, request, ...errorData } = error.response;
      return errorData;
    } else {
      // If there is no error response, return the entire error object
      return Promise.reject(error);
    }
  }
);

export default axios;
