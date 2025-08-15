import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { user } from "./urls";
import { userPayload } from "./payloadBuilder";

export const userService = {

  // user list Function
  GetUserList: async (action: string, data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload(action, data);
      const res = await request<ApiResponse>("post", user.GetUserList, payload, true)
      return res;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  }
}