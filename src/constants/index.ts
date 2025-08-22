import Cookies from "js-cookie";

const getUserFromCookies = () => {
  const data = Cookies.get("userData");
  return data ? JSON.parse(data) : null;
};

export const constants = {
  platform: import.meta.env.VITE_REACT_APP_PLATFORM,
  theme: import.meta.env.VITE_REACT_APP_THEME,
  client: import.meta.env.VITE_REACT_APP_CLIENT,
  baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  user: getUserFromCookies(),
};

