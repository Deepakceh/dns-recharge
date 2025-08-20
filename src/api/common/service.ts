import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { commonUrls } from "./urls";
// import { commonPayload } from "./payloadBuilder";

export const commonService = {

  // state data service
  StateList: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", commonUrls.StateList, null, true)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // district data service
  DistrictList: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${commonUrls.DistrictList}?stateId=${id}`;

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
      const res = await request<ApiResponse>("get", commonUrls.CompanyType, null, true)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // user dropdown service
  UserDropdown: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", commonUrls.UserDropdown, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // role dropdown service
  GetRoles: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", commonUrls.GetRoles, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

   // package dropdown service
  PackageDropdown: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", commonUrls.PackageDropdown, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },
};
