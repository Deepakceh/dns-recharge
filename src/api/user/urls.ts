import { constants } from "@/constants/index";

export const user = {
  GetUserList: `${constants.baseUrl}User/GetUserList`,
  AddUpdateUser: `${constants.baseUrl}User/AddUpdateUser`,
  GetUserById: `${constants.baseUrl}User/GetUserById`,
  GetNotificationBarData: `${constants.baseUrl}User/GetNotificationBarData`,
  AddUpdateNotificationBar: `${constants.baseUrl}User/AddUpdateNotificationBar`,
  AddUpdateRole: `${constants.baseUrl}RolePermission/AddUpdateRole`,
  GetPackageData: `${constants.baseUrl}Package/GetPackageData`,
  AddUpdatePackage: `${constants.baseUrl}Package/AddUpdatePackage`,
};