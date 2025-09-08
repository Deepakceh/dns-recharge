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

  // account type dropdown service
  AccountType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.AccountType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // bank name dropdown service
  BankDropdown: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.BankDropdown, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // transfer type dropdown service
  TransferType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.TransferType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // gst type dropdown service
  GstType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.GstType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // operator type dropdown service
  OperatorType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.OperatorType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // operator type dropdown service
  OperatorDropdown: async (id: string): Promise<ApiResponse> => {
    try {
      const url = `${dropdownUrls.OperatorDropdown}?operatorTypeId=${id}`;
      const res = await request<ApiResponse>("get", url, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // operator type dropdown service
  Circle: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.Circle, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // commission type dropdown service
  CommissionType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.CommissionType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },

  // amount type dropdown service
  AmountType: async (): Promise<ApiResponse> => {
    try {
      const res = await request<ApiResponse>("get", dropdownUrls.AmountType, null, false)
      return res;
    } catch (error) {
      console.error(`Error in common_state:`, error);
      throw error;
    }
  },
};
