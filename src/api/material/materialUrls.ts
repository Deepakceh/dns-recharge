import { constants } from "@/constants/index";

export const materialUrls = {
  // list page urls
  dropdown: `${constants.baseUrl}${constants.apiCommon}GetCommonDropdown`,
  list: `${constants.baseUrl}${constants.material}GetMaterialMasterList`,
  workflow: `${constants.baseUrl}${constants.material}GetMaterialMasterWorkFlow`,
  changelog: `${constants.baseUrl}${constants.material}GetMaterialMasterLog`,
  depStatus: `${constants.baseUrl}${constants.material}GetMaterialMasterList`,
  checkMaterial: `${constants.baseUrl}${constants.material}GetMaterialMasterList`,
  refMaterial: `${constants.baseUrl}${constants.material}MaterialMasterCopyReference`,
  blockUnblockMaterial: `${constants.baseUrl}${constants.apiCommon}CommonBlockedOperation`,
  // add page urls
};
