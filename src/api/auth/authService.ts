import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";  // ← Axios API client
import { authUrls } from "./authUrls";   // ← Auth URLs
import { buildAuthPayload } from "./authPayloadBuilder";  // ← Payload builder

export const authService = {

  // 🔥 Admin Login Function
  admin_login: async (
    action: string,
    data: unknown
  ): Promise<ApiResponse> => {
    try {
      const payload = buildAuthPayload(action, data);   // Build payload dynamically

      const response = await request<ApiResponse>("post", authUrls.admin_login, payload, true) // ← Skip token for login API

      return response;  // ✅ Always return the response
    } catch (error) {
      console.error(`Error in ${action}:`, error);  // Include the error variable
      throw error;
    }
  }
};
