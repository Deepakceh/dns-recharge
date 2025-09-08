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

//  "data": {
//         "id": 1,
//         "roleId": 1,
//         "mobileNumber": "8859192935",
//         "email": "deepakceh7@gmail.com",
//         "orgName": null,
//         "roleName": "Admin",
//         "p2PBalance": 0.0000,
//         "p2ABalance": 0.0000
//     }

