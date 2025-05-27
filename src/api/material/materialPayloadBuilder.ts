// Dynamic Payload Builder for Material Module
export const buildMaterialPayload = (
    action: string,
    data: any,
    userAllData: any
  ) => {
    switch (action) {
      case "GET_MATERIAL_DATA":
        return {
          PlantID: data?.plantId || "",
          ProductTypeID: data?.productId || "",
          ObjCommon: {
            LoggedInUserID: userAllData[0]?.loginUserId,
            Action: "GET_MATERIAL_DATA",
            SearchText: data?.search || "",
            CompanyID: userAllData[0]?.companyId,
            PageIndex: `${data.page || 1}`,
            PageSize: `${data.rowLimit || 10}`
          }
        };
  
      case "GETMATERIALDEPTSTATUS":
        return {
          ObjCommon: {
            LoggedInUserID: userAllData[0]?.loginUserId,
            Action: "GETMATERIALDEPTSTATUS",
            SearchText: data?.RequestNo || "",
            PageIndex: "1",
            PageSize: "100",
            CompanyID: userAllData[0]?.companyId
          }
        };
  
      case "GET_MATERIAL_BYTEXT":
        return {
          ObjCommon: {
            LoggedInUserID: userAllData[0]?.loginUserId,
            Action: "GET_MATERIAL_BYTEXT",
            SearchText: data?.searchText || "",
            CompanyID: userAllData[0]?.companyId
          }
        };
  
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  };
  