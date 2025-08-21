import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { user } from "./urls";
import { userPayload } from "./payloadBuilder";

export const userService = {

  // user list service
  GetUserList: async (action: string, data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload(action, data);
      const res = await request<ApiResponse>("post", user.GetUserList, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  },

  // add updated user service
  AddUpdateUser: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('ADD_UPDATE_USER', data);
      const res = await request<ApiResponse>("post", user.AddUpdateUser, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

  // get data by user id service
  GetUserById: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${user.GetUserById}/${id}`
      const res = await request<ApiResponse>("post", url, null, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

  // user list service
  GetNotificationBarData: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('GET_NOTIFICATION_LIST', data);
      const res = await request<ApiResponse>("post", user.GetNotificationBarData, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in user notification}:`, error);
      throw error;
    }
  },

  // add updated notification service
  AddUpdateNotificationBar: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('ADD_UPDATE_NOTIFICATION', data);
      const res = await request<ApiResponse>("post", user.AddUpdateNotificationBar, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },
}