import Cookies from "js-cookie";

export const clearAllCookies = (): void => {
  const cookies = Cookies.get();  // Get all cookies
  for (const cookie in cookies) {
    Cookies.remove(cookie);  // Remove each cookie
  }
  console.log("All cookies cleared.");
};
