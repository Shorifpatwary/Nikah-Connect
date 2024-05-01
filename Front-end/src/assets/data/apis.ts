export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
export type argumentsType = {
  url: string;
  method: HTTPMethod;
};

export const checkTokenValidity: argumentsType = {
  url: "http://localhost:8000/api/check-token",
  method: "POST",
};

export const login: argumentsType = {
  url: "http://localhost:8000/api/login",
  method: "POST",
};
export const logout: argumentsType = {
  url: "http://localhost:8000/api/logout",
  method: "POST",
};

export const register: argumentsType = {
  url: "http://localhost:8000/register",
  method: "POST",
};

export const customerProfile: argumentsType = {
  url: "http://localhost:8000/api/customer/profile",
  method: "GET",
};

export const editCP: argumentsType = {
  url: "http://localhost:8000/api/customer/edit",
  method: "GET",
};

export const updateCP: argumentsType = {
  url: "http://localhost:8000/api/customer/update",
  method: "PUT",
};

export const category: argumentsType = {
  url: "http://localhost:8000/api/category",
  method: "GET",
};

export const brand: argumentsType = {
  url: "http://localhost:8000/api/brand",
  method: "GET",
};

export const productSearch: argumentsType = {
  url: "http://localhost:8000/api/search",
  method: "GET",
};

export const singleProduct: argumentsType = {
  url: "http://localhost:8000/api/product",
  method: "GET",
};

// for home page
export const todayDeal: argumentsType = {
  url: "http://localhost:8000/api/today_deal",
  method: "GET",
};
export const newArrival: argumentsType = {
  url: "http://localhost:8000/api/new_arrival",
  method: "GET",
};
export const bestDiscount: argumentsType = {
  url: "http://localhost:8000/api/best_discount",
  method: "GET",
};
export const trendingItem: argumentsType = {
  url: "http://localhost:8000/api/trending",
  method: "GET",
};

export const subscriberCreate: argumentsType = {
  url: "http://localhost:8000/api/create_news_letter",
  method: "POST",
};
export const getProductReview: argumentsType = {
  url: "http://localhost:8000/api/review",
  method: "GET",
};
export const createProductReview: argumentsType = {
  url: "http://localhost:8000/api/review",
  method: "POST",
};
export const createOrder: argumentsType = {
  url: "http://localhost:8000/api/order",
  method: "POST",
};
export const orders: argumentsType = {
  url: "http://localhost:8000/api/order",
  method: "GET",
};

export const customerAddress: argumentsType = {
  url: "http://localhost:8000/api/customer-address",
  method: "GET",
};

export const deleteCustomerAddress: argumentsType = {
  url: "http://localhost:8000/api/customer-address",
  method: "DELETE",
};
// Export the full object as the default export
export default {
  checkTokenValidity,
  login,
  register,
  customerProfile,
  editCP,
  updateCP,
  category,
};
