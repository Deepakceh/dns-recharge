import { constants } from "@/constants/index";

export const user = {
  GetUserList: `${constants.baseUrl}User/GetUserList`,
  AddUpdateUser: `${constants.baseUrl}User/AddUpdateUser`,
  GetUserById: `${constants.baseUrl}User/GetUserById`,
  UpdateUserStatus: `${constants.baseUrl}CommonToggleDelete/UpdateUserStatus`,
};