import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";  
import { authUrls } from "./authUrls";  
import { buildAuthPayload } from "./authPayloadBuilder";  

export const authService = {

  // Admin Login Function
  admin_login: async (
    action: string,
    data: unknown
  ): Promise<ApiResponse> => {
    try {
      const payload = buildAuthPayload(action, data);  

      const response = await request<ApiResponse>("post", authUrls.admin_login, payload, true) 

      return response;  
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  }
};
