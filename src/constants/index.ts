import { decoder } from "@/utils/decoder";
import Cookies from "js-cookie";

export const constants = {
  platform: import.meta.env.VITE_REACT_APP_PLATFORM,
  theme: import.meta.env.VITE_REACT_APP_THEME,
  client: import.meta.env.VITE_REACT_APP_CLIENT,
  baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  loginAuth: import.meta.env.VITE_REACT_APP_LOGIN_AUTH,
  apiCommon: import.meta.env.VITE_REACT_APP_API_COMMON,
  material: import.meta.env.VITE_REACT_APP_MATERIAL,
};

export const getUserAllData = (): Record<string, string> | null => {
  const userCookie = Cookies.get("user_data");
  const token = Cookies.get("token");

  if (!userCookie || !token) return null;

  try {
    const decodedString = decoder(userCookie);          
    const decodedData = JSON.parse(decodedString);     

    if (decodedData?.VConnectValidate?.length) {
      const item = decodedData.VConnectValidate[0];

      return {
        LoginUserID: `${item?.LoginUserID ?? ""}`,
        UserID: `${item?.UserID ?? ""}`,
        UserName: `${item?.UserName ?? ""}`,
        FullName: `${item?.FullName ?? ""}`,
        CompanyID: `${item?.CompanyID ?? ""}`,
        CompanyCode: `${item?.CompanyCode ?? ""}`,
        SappCompanyCode: `${item?.SappCompanyCode ?? ""}`,
        DateShort: `${item?.DateShort ?? ""}`,
        DateLong: `${item?.DateLong ?? ""}`,
        IsVendor: `${item?.IsVendor ?? ""}`,
        DepartmentCode: `${item?.DepartmentCode ?? ""}`,
        MATCAllowSection: `${item?.MATCAllowSection ?? ""}`,
      };
    }
  } catch (error) {
    console.error("Failed to decode user data:", error);
  }

  return null;
};
