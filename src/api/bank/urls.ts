import { constants } from "@/constants/index";

export const bank = {
  GetBankAccountData: `${constants.baseUrl}Bank/GetBankAccountData`,
  AddUpdateBankAccount: `${constants.baseUrl}Bank/AddUpdateBankAccount`,
  GetBankDetailsById: `${constants.baseUrl}Bank/GetBankDetailsById/`,
};