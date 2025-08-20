import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { user } from "./urls";
import { userPayload } from "./payloadBuilder";

export const userService = {

  // user list Function
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

   // updated user toggle button service
  UpdateUserStatus: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('USER_TOGGLE', data);
      const res = await request<ApiResponse>("post", user.UpdateUserStatus, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  }
}