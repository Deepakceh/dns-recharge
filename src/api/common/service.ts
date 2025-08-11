import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { commonUrls } from "./urls";
// import { commonPayload } from "./payloadBuilder";

export const commonService = {

  // State Function
  common_state: async (): Promise<ApiResponse> => {
    try {
      const response = await request<ApiResponse>("get", commonUrls.state, null, true)
      return response;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // District Function
  common_district: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${commonUrls.district}?stateId=${id}`;

      const response = await request<ApiResponse>("get", url, null, true)
      return response;
    } catch (error) {
      console.error(`Error in common_district:`, error);
      throw error;
    }
  }
};
