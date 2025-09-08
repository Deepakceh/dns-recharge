import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { commonUrls } from "./urls";
import { commonPayload } from "./payloadBuilder";

export const commonService = {

  // updated user toggle button service
  CommonToggle: async (action: string, method: string, data: unknown): Promise<ApiResponse> => {
    try {
      const url = `${commonUrls.CommonToggle}${method}`
      const payload = commonPayload(action, data);
      const res = await request<ApiResponse>("post", url, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },
};
