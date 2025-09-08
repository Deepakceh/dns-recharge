import { constants } from "@/constants/index";

export const user = {
  // user urls
  GetUserList: `${constants.baseUrl}User/GetUserList`,
  AddUpdateUser: `${constants.baseUrl}User/AddUpdateUser`,
  GetUserById: `${constants.baseUrl}User/GetUserById`,

  // user notifications urls
  GetNotificationBarData: `${constants.baseUrl}User/GetNotificationBarData`,
  AddUpdateNotificationBar: `${constants.baseUrl}User/AddUpdateNotificationBar`,

  // user roles urls
  GetRoleList: `${constants.baseUrl}RolePermission/GetRoleList`,
  AddUpdateRole: `${constants.baseUrl}RolePermission/AddUpdateRole`,
  GetRoleById: `${constants.baseUrl}RolePermission/GetRoleById/`,
  GetMenuForRolePermissions: `${constants.baseUrl}RolePermission/GetMenuForRolePermissions`,
  SetMenuPermissions: `${constants.baseUrl}RolePermission/SetMenuPermissions`,
  
  // user packages urls
  GetPackageData: `${constants.baseUrl}Package/GetPackageData`,
  AddUpdatePackage: `${constants.baseUrl}Package/AddUpdatePackage`,
  GetPackageWiseMargins: `${constants.baseUrl}Package/GetPackageWiseMargins`,
  GetPackageSlabMarginById: `${constants.baseUrl}Package/GetPackageSlabMarginById/`,

  AddUpdatePackageSlabMargin: `${constants.baseUrl}Package/AddUpdatePackageSlabMargin`,

  //wallet urls
  GetWalletTransactionList: `${constants.baseUrl}Wallet/GetWalletRequestData`,
  //AddUpdateWalletTransaction: `${constants.baseUrl}Wallet/AddUpdateWalletTransaction`,
  //GetWalletTransactionById: `${constants.baseUrl}Wallet/GetWalletTransactionById/`,
};