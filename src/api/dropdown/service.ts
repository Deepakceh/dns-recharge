import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { dropdownUrls } from "./urls";
// import { dropdownPayload } from "./payloadBuilder";

export const dropdownService = {

  // state data service
  StateList: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.StateList, null, true)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // district data service
  DistrictList: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${dropdownUrls.DistrictList}?stateId=${id}`;

      const res = await request<ApiResponse>("get", url, null, true)
      return res;
    } catch (error) {
      console.error(`Error in common_district:`, error);
      throw error;
    }
  },

  // company data service
  CompanyType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.CompanyType, null, true)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // user dropdown service
  UserDropdown: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.UserDropdown, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // role dropdown service
  GetRoles: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.GetRoles, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // package dropdown service
  PackageDropdown: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.PackageDropdown, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // callback dropdown service
  CallBackType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.CallBackType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },
};
