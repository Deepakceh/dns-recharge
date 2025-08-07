import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { commonUrls } from "./urls";
import { commonPayload } from "./payloadBuilder";

export const commonService = {

  // State Function
  common_state: async (): Promise<ApiResponse> => {
    try {
      const response = await request<ApiResponse>("get", commonUrls.state, null, true) // ← Skip token for login API
      return response;  // ✅ Always return the response
    } catch (error) {
      console.error(`Error in common_state:`, error);  // Include the error variable
      throw error;
    }
  },

  // District Function
  common_district: async (
    action: string,
    data: unknown
  ): Promise<ApiResponse> => {
    try {
      const payload = commonPayload(action, data);   // Build payload dynamically

      const response = await request<ApiResponse>("get", commonUrls.district, payload, true) // ← Skip token for login API
      return response;  // ✅ Always return the response
    } catch (error) {
      console.error(`Error in common_state:`, error);  // Include the error variable
      throw error;
    }
  }
};
