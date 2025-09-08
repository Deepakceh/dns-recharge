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
  SignUp: async (data: SignUpRawData): Promise<ApiResponse> => {
    try {
      const payload = authPayload("SIGN_UP", data);
      const res = await request<ApiResponse>("post", auth.SignUp, payload, true);
      return res;
    } catch (error) {
      console.error(`Error in SIGN_UP}:`, error);
      throw error;
    }
  },

  // sign in service
  SignIn: async (action: string, data: SignUpRawData): Promise<ApiResponse> => {
    try {
      const payload = authPayload(action, data);
      return await request("post", auth.SignIn, payload, true);
    } catch (error) {
      console.error(`Error in SignIn:`, error);
      throw error;
    }
  },

  // send otp service
  SendOTP: async (mobile: string): Promise<ApiResponse> => {
    try {
      const url = `${auth.SendOTP}?MobileNumber=${mobile}`;
      const res = await request<ApiResponse>("get", url, null, true)
      return res;
    } catch (error) {
      console.error(`Error in SendOTP:`, error);
      throw error;
    }
  },

  // signup service
  ForgotPassWord: async (data: SignUpRawData): Promise<ApiResponse> => {
    try {
      const payload = authPayload("FORGOT_PASSWORD", data);
      const res = await request<ApiResponse>("post", auth.ForgotPassWord, payload, true);
      return res;
    } catch (error) {
      console.error(`Error in SIGN_UP}:`, error);
      throw error;
    }
  },

};
