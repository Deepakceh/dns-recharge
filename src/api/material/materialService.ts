import { ApiResponse } from "@/types/apiResponse";
import { request } from "../apiClient";
import { materialUrls } from "./materialUrls";
import { buildMaterialPayload } from "./materialPayloadBuilder";

export const materialService = {
  // Unified service function for material module
  getMaterialData: async (
    action: string,
    data: any,
    userAllData: any
  ): Promise<ApiResponse> => {
    try {
      const payload = buildMaterialPayload(action, data, userAllData);
      const response = await request<ApiResponse>(
        "post",
        materialUrls.list,
        payload
      );

      return response;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  },

  getWorkFlow: (data?: any) =>
    request<ApiResponse>("post", materialUrls.workflow, data),

  getChangeLog: (data?: any) =>
    request<ApiResponse>("post", materialUrls.changelog, data),

  copyReferenceMaterial: (data: { materialId: number }) =>
    request<ApiResponse>("post", materialUrls.refMaterial, data),

  blockUnblockMaterial: (data: { materialId: number; action: string }) =>
    request<ApiResponse>("post", materialUrls.blockUnblockMaterial, data)
};
