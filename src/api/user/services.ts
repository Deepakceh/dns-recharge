import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { user } from "./urls";
import { userPayload } from "./payloadBuilder";

export const userService = {

  // user list service
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

  // get data by user id service
  GetUserById: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${user.GetUserById}/${id}`
      const res = await request<ApiResponse>("post", url, null, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

  // user list service
  GetNotificationBarData: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('GET_NOTIFICATION_LIST', data);
      const res = await request<ApiResponse>("post", user.GetNotificationBarData, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in user notification}:`, error);
      throw error;
    }
  },

  // add updated notification service
  AddUpdateNotificationBar: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('ADD_UPDATE_NOTIFICATION', data);
      const res = await request<ApiResponse>("post", user.AddUpdateNotificationBar, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateUser:`, error);
      throw error;
    }
  },

  // add updated role service
  AddUpdateRole: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('ADD_UPDATE_ROLE', data);
      const res = await request<ApiResponse>("post", user.AddUpdateRole, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdateRole:`, error);
      throw error;
    }
  },
  // user list service
  GetPackageData: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('GET_PACKAGE_LIST', data);
      const res = await request<ApiResponse>("post", user.GetPackageData, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in package list:`, error);
      throw error;
    }
  },

  // add updated package service
  AddUpdatePackage: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('ADD_UPDATE_PACKAGE', data);
      const res = await request<ApiResponse>("post", user.AddUpdatePackage, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in AddUpdatePackage:`, error);
      throw error;
    }
  },

  // get package wise margins service
  GetPackageWiseMargins: async (data: unknown): Promise<ApiResponse> => {
    try {
      const payload = userPayload('GET_PACKAGE_WISE_MARGINS', data);
      const res = await request<ApiResponse>("post", user.GetPackageWiseMargins, payload, false)
      return res;
    } catch (error) {
      console.error(`Error in GetPackageWiseMargins:`, error);
      throw error;
    }
  },

  // get package wise margins service
  GetPackageSlabMarginById: async (id: number): Promise<ApiResponse> => {
    try {
      const url = `${user.GetPackageSlabMarginById}${id}`
      const res = await request<ApiResponse>("post", url, null, false)
      return res;
    } catch (error) {
      console.error(`Error in GetPackageSlabMarginById:`, error);
      throw error;
    }
  },
}