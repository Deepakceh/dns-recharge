import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { bank } from "./urls";
import { bankPayload } from "./payloadBuilder";

export const bankService = {

  // user bank service
  GetBankAccountData: async (action: string, data: unknown): Promise<ApiResponse> => {
    try {
      const payload = bankPayload(action, data);
      const res = await request<ApiResponse>("post", bank.GetBankAccountData, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  },

  // add updated bank service
  AddUpdateBankAccount: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = bankPayload('ADD_UPDATE_BANK', data);
      const res = await request<ApiResponse>("post", bank.AddUpdateBankAccount, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

  // get data by bank id service
  GetBankDetailsById: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${bank.GetBankDetailsById}/${id}`
      const res = await request<ApiResponse>("post", url, null, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

  // bank statement service
  GetBankStatementData: async (action: string, data: unknown): Promise<ApiResponse> => {
    try {
      const payload = bankPayload(action, data);
      const res = await request<ApiResponse>("post", bank.GetBankStatementData, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  },
}