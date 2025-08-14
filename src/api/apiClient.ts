import axios from "axios";
import { constants } from "@/constants/index";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: constants.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use((constants) => {
  const token = Cookies.get("token");

  // Skip adding token if `skipAuth` is set to true
  if (!constants.headers.skipAuth && token) {
    constants.headers.Authorization = `Bearer ${token}`;
  }

  // Remove skipAuth header before sending the request to avoid issues
  delete constants.headers.skipAuth;

  return constants;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Token expired. Redirecting to login...");
      
      // Remove expired token and redirect to login
      Cookies.remove("token");
      Cookies.remove("user_data");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Generic API request function
export const request = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown,
  skipAuth: boolean = false  // Add a flag for skipping auth
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        skipAuth: skipAuth ? "true" : undefined, // Only add skipAuth flag when needed
      },
    });

    if (response.status === 200) {
      return response.data as T;
    } else {
      throw new Error(response.data.responseMessage || "Something went wrong!");
    }
  } catch (error: unknown) {
    console.error("API Error:", error);
    throw error;
  }
};
