import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { user } from "./urls";
import { getUserListPayload } from "./payloadBuilder";

export const userService = {

  // user list Function
   getUserList: async (
     action: string,
     data: unknown
   ): Promise<ApiResponse> => {
     try {
       const payload = getUserListPayload(action, data);  
 
       const response = await request<ApiResponse>("post", user.getUserList, payload, true) 
 
       return response;  
     } catch (error) {
       console.error(`Error in ${action}:`, error);
       throw error;
     }
   }
}