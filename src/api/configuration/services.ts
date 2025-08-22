import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { config } from "./urls";
import { configPayload } from "./payloadBuilder";

export const configService = {

  // user list service
  GetCallBackURLData: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = configPayload('GET_CALLBACK_LIST', data);
      const res = await request<ApiResponse>("post", config.GetCallBackURLData, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in user notification}:`, error);
      throw error;
    }
  },

  // add updated notification service
  AddUpdateCallBackURL: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = configPayload('ADD_UPDATE_CALLBACK', data);
      const res = await request<ApiResponse>("post", config.AddUpdateCallBackURL, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

   // add ip address service
  AddRechargeIP: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = configPayload('ADD_RECHARGE_IP', data);
      const res = await request<ApiResponse>("post", config.AddRechargeIP, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },
}