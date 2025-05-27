import { constants } from "@/constants/index";

export const authUrls = {
  admin_login: `${constants.baseUrl}${constants.loginAuth}VConnectAdminValidate`,
  vendor: `${constants.baseUrl}${constants.loginAuth}VConnectVendorValidate`,
  // forgotPassword: `${constants.baseUrl}${constants.loginAuth}ForgotPassword`,
  // resetPassword: `${constants.baseUrl}${constants.loginAuth}ResetPassword`,
};