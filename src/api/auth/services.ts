import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { auth } from "./urls";
import { SignUpRawData, authPayload } from "./payloadBuilder";

export const authService = {

  // send signup otp service
  SendSignUpOTP: async (mobile: string, email: string): Promise<ApiResponse> => {
    try {
      const url = `${auth.SendSignUpOTP}?MobileNumber=${mobile}&Email=${email}`;

      const res = await request<ApiResponse>("get", url, null, true)
      return res;
    } catch (error) {
      console.error(`Error in SendSignUpOTP:`, error);
      throw error;
    }
  },

  // signup service
  SignUp: async (action: "SIGN_UP", data: SignUpRawData): Promise<ApiResponse> => {
    try {
      const payload = authPayload(action, data);
      const res = await request<ApiResponse>("post", auth.SignUp, payload, true);
      return res;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  }

  // Login: async (data: { email: string; password: string }): Promise<ApiResponse> => {
  //   const payload = authPayload("LOGIN", data);
  //   return await request("post", auth.Login, payload, true);
  // }

};
